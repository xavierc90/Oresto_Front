import { useEffect, useState } from 'react';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { Table } from '../../../../Module/Types/table.type';
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from 'react-router-dom';


interface TimeSlot {
  time: string;
  status: string;
  _id: string;
  booking_id?: string;
  user_id?: string;
}

interface TableWithSlots extends Table {
  time_slots: TimeSlot[];
}

interface TableBookingAreaProps {
  selectedDate: Date | null;
  company: { _id: string };
  token: string | null;
}

export const TableBookingArea: React.FC<TableBookingAreaProps> = ({ selectedDate, company, token }) => {
  const [tables, setTables] = useState<TableWithSlots[]>([]); // État pour stocker les tables avec leurs time_slots
  const [loading, setLoading] = useState<boolean>(true); // Pour gérer le chargement des données

  useEffect(() => {
    const fetchTables = async () => {
      if (!company?._id || !token) {
        console.error('Company ID ou token non trouvés');
        return;
      }

      try {
        let formattedDate = '';
        if (selectedDate) {
          const offset = selectedDate.getTimezoneOffset();
          const localDate = new Date(selectedDate.getTime() - offset * 60 * 1000);
          formattedDate = localDate.toISOString().split('T')[0];
        }

        const response = await http.get(`/table_plan/${formattedDate}?company_id=${company._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });

        if (response.data && Array.isArray(response.data.tables)) {
          setTables(response.data.tables);
        } else {
          console.error('Données de réponse inattendues:', response.data);
          setTables([]); // Réinitialise les tables si les données ne sont pas au format attendu
        }
      } catch (error: any) {
        console.error('Erreur lors de la récupération des tables:', error.response?.data || error.message);
        setTables([]); // Réinitialise les tables en cas d'erreur
      } finally {
        setLoading(false); // Arrête le chargement des données
      }
    };

    if (company?._id && token) {
      fetchTables();
    } else {
      setLoading(false);
    }
  }, [selectedDate, company, token]);

  // Rendu conditionnel pour afficher le message si aucune table n'existe
  if (loading) {
    return <p>Chargement des tables...</p>;
  }

  if (tables.length === 0) {

    const getLinkClass = (path: string) => {
      return location.pathname.startsWith(path)
        ? 'flex flex-col items-center text-red-500 dark:text-white transition duration-300'
        : 'flex flex-col items-center text-gray-600 hover:text-red-500 dark:hover:text-white transition duration-300';
    };

    return (
      <div className='flex flex-col justify-center items-center'>
          <h1 className='font-semibold text-lg'>Bienvenue sur l'application Oresto</h1>
          <p className='pb-5'>Afin de rendre la réservation en ligne fonctionnelle, créez votre plan de tables</p>
      <Link to="/dashboard/table_plan" className={getLinkClass('/dashboard/table_plan')}>
          <LuLayoutDashboard size={23} className="mb-1" />
          <h2 className="text-xs font-bold dark:text-grey-700">Plan de tables</h2>
        </Link>
        </div>
    );
  }

  // Fonction pour définir la couleur en fonction du statut
  const getColorByStatus = (status: string) => {
    switch (status) {
      case 'waiting':
        return { tableColor: '#F8D89C', tableSizeColor: '#DF9507' }; // Orange pour waiting
      case 'confirmed':
        return { tableColor: '#FAD8D8', tableSizeColor: '#DB9E9E  ' }; // Rouge pour confirmed
      case 'available':
        return { tableColor: '#DFF3CA', tableSizeColor: '#73A741' }; // Vert pour available
      case 'unavailable':
        return { tableColor: '#D3D3D3', tableSizeColor: '#A9A9A9' }; // Gris pour unavailable
      default:
        return { tableColor: '#FFFFFF', tableSizeColor: '#000000' }; // Default (blanc et noir)
    }
  };

  const renderTableSVG = (table: TableWithSlots) => {
    // Cherche le statut prioritaire pour définir la couleur
    const status =
      table.time_slots.find((slot) => ['waiting', 'confirmed', 'unavailable'].includes(slot.status))?.status || 'available';
  
    // Applique les couleurs en fonction du statut
    const { tableColor, tableSizeColor } = getColorByStatus(status);
  
    // Applique la rotation depuis la base de données (par défaut 0 si non défini)
    const rotation = table.rotate || 0;
  
    switch (table.shape) {
      case 'rectangle':
        if (table.table_size === 4) {
          return (
            <svg
              width="123"
              height="74"
              viewBox="0 0 123 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="32.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="32.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="90.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="90.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <rect y="8" width="143" height="57" fill={tableColor} />
            </svg>
          );
        }
        if (table.table_size === 6) {
          return (
            <svg
              width="123"
              height="74"
              viewBox="0 0 123 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="22.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="22.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="101.45" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="101.45" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="63.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="63.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <rect y="8" width="123" height="57" fill={tableColor} />
            </svg>
          );
        }
        if (table.table_size === 8) {
          return (
            <svg
              width="153"
              height="74"
              viewBox="0 0 153 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="37.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="37.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="8.33255" cy="36.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="145.333" cy="36.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="116.45" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="116.45" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="78.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="78.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <rect x="10" y="8" width="134" height="57" fill={tableColor} />
            </svg>
          );
        }
        break;
  
      case 'round':
        if (table.table_size === 2) {
          return (
            <svg
              width="70"
              height="85"
              viewBox="0 0 70 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="35.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <rect y="7" width="70" height="70" rx="35" fill={tableColor} />
            </svg>
          );
        }
        if (table.table_size === 4) {
          return (
            <svg
              width="86"
              height="85"
              viewBox="0 0 86 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="43.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="7.5806" cy="42.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="77.5811" cy="42.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <rect x="8" y="7" width="70" height="70" rx="35" fill={tableColor} />
            </svg>
          );
        }
        break;
  
      case 'square':
        if (table.table_size === 2) {
          return (
            <svg
              width="70"
              height="90"
              viewBox="0 0 70 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="35.5806" cy="82.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <rect y="10" width="70" height="70" fill={tableColor} />
            </svg>
          );
        }
        if (table.table_size === 4) {
          return (
            <svg
              width="87"
              height="86"
              viewBox="0 0 87 86"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }} // Applique la rotation
            >
              <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="7.5806" cy="44.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="78.5811" cy="44.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="43.5806" cy="78.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <path d="M8 8L78 8L78 78L8 78L8 8Z" fill={tableColor} />
            </svg>
          );
        }
        break;
  
      default:
        return null;
    }
  };
  

  return (
    <div className="max-w-4/5 h-96 ml-12 p-4 mt-7 border border-zinc-300 bg-zinc-50 dark:bg-dark-900 dark:border-dark-800 dark:text-black relative"
    style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px), repeating-linear-gradient(-90deg, transparent, transparent 19px, rgba(0,0,0,0.1) 20px)',
    }}
    >
      {tables.map((table) => (
        <div
          key={table._id}
          className="table-container"
          style={{
            position: 'absolute',
            left: `${table.position_x}px`, // Utilise la position_x de la base de données
            top: `${table.position_y}px`, // Utilise la position_y de la base de données
          }}
        >
          {renderTableSVG(table)}
          <div className="number-circle">
            <span>{table.table_number}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

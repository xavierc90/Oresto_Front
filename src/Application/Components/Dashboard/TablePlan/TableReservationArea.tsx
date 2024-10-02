import React, { useEffect, useState } from 'react';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { Table } from '../../../../Module/Types/table.type';
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { Reservation } from '../../../../Module/Types/reservation.type';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FaLightbulb } from "react-icons/fa"; // Icône pour le bouton ampoule

interface TableReservationAreaProps {
  selectedDate: Date | null;
  restaurant: { _id: string };
  token: string | null;
  reservations: Reservation[];
  isOpen: boolean;
}

export const TableReservationArea: React.FC<TableReservationAreaProps> = ({ selectedDate, restaurant, token, reservations, isOpen }) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // État pour gérer le mode clair/sombre

  // Fonction pour basculer entre clair et sombre
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    console.log('Tables dans TableReservation:', tables);
    console.log('Réservations dans TableReservation:', reservations);
    
    const fetchTables = async () => {
      if (!restaurant?._id || !token) {
        console.error('Restaurant ID ou token non trouvés');
        return;
      }

      try {
        let formattedDate = '';
        if (selectedDate) {
          const offset = selectedDate.getTimezoneOffset();
          const localDate = new Date(selectedDate.getTime() - offset * 60 * 1000);
          formattedDate = localDate.toISOString().split('T')[0];
        }

        const response = await http.get(`/table_plan/${formattedDate}?restaurant_id=${restaurant._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });

        if (response.data && Array.isArray(response.data.tables)) {
          setTables(response.data.tables);
        } else {
          console.error('Données de réponse inattendues:', response.data);
          setTables([]);
        }
      } catch (error: any) {
        console.error('Erreur lors de la récupération des tables:', error.response?.data || error.message);
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    if (restaurant?._id && token) {
      fetchTables();
    } else {
      setLoading(false);
    }
  }, [selectedDate, restaurant, token]);

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
        <h1 className='font-semibold text-xl pb-2'>Bienvenue sur l'application Oresto</h1>
        <p className='pb-5'>Afin de rendre la réservation en ligne fonctionnelle, créez votre plan de table</p>
        <Link to="/dashboard/table_plan" className={getLinkClass('/dashboard/table_plan')}>
          <LuLayoutDashboard size={23} className="mb-1" />
          <h2 className="text-xs font-bold dark:text-grey-700">Plan de table</h2>
        </Link>
      </div>
    );
  }

  const translateStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'confirmée';
      case 'waiting':
        return 'en attente';
      case 'canceled':
        return 'annulée';
      case 'available':
        return 'disponible';
      case 'unavailable':
        return 'indisponible';
      default:
        return status;
    }
  };

  // Ajuster les couleurs des tables en fonction du thème
  const getColorByStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'waiting':
        return { tableColor: '#ffd16d', tableSizeColor: '#eea404' };
      case 'confirmed':
        return { tableColor: '#76c87a', tableSizeColor: '#59a25d' };
      case 'available':
        return isDarkMode
          ? { tableColor: '#fafafa', tableSizeColor: '#ffffff' } // Couleur pour mode sombre
          : { tableColor: '#e0e0e0', tableSizeColor: '#d3d3d3' }; // Couleur pour mode clair
      case 'unavailable':
        return { tableColor: '#D3D3D3', tableSizeColor: '#A9A9A9' };
      default:
        return { tableColor: '#F1F1F1', tableSizeColor: '#7F7F7F' };
    }
  };

  const getTableStatus = (table: Table) => {
    const tableIdToMatch = table.table_id ? table.table_id._id : table._id;
    const tableReservations = reservations.filter(r => r.table_id === tableIdToMatch && r.status !== 'canceled');

    if (tableReservations.length > 0) {
      if (tableReservations.some(r => r.status.toLowerCase() === 'waiting')) {
        return 'waiting';
      }
      if (tableReservations.some(r => r.status.toLowerCase() === 'confirmed')) {
        return 'confirmed';
      }
    }
    return 'available';
  };

  const getReservationsForTable = (table: Table) => {
    const tableIdToMatch = table.table_id ? table.table_id._id : table._id;
    const tableReservations = reservations.filter(r => r.table_id === tableIdToMatch && r.status !== 'canceled');
    return tableReservations;
  };

  const renderTableSVG = (table: Table) => {
    const status = getTableStatus(table);
    const { tableColor, tableSizeColor } = getColorByStatus(status);

    const rotation = table.rotate || 0;
    const tableNumber = table.number;
    const tableCapacity = table.capacity;
    const tableShape = table.shape;

    switch (tableShape) {
      case 'rectangle':
        if (tableCapacity === 4) {
          return (
            <svg
              width="123"
              height="74"
              viewBox="0 0 123 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <ellipse cx="32.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="32.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="90.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="90.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <rect y="8" width="123" height="57" fill={tableColor} />
            </svg>
          );
        }
        if (tableCapacity === 6) {
          return (
            <svg
              width="123"
              height="74"
              viewBox="0 0 123 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <ellipse cx="22.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="22.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="63.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="63.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="101.45" cy="8.25806" rx="7.58057" ry="7.37635" fill={tableSizeColor} />
              <ellipse cx="101.45" cy="66.2533" rx="7.58057" ry="7.37634" fill={tableSizeColor} />
              <rect y="8" width="123" height="57" fill={tableColor} />
            </svg>
          );
        }
        if (tableCapacity === 8) {
          return (
            <svg
              width="153"
              height="74"
              viewBox="0 0 153 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
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
        if (tableCapacity === 2) {
          return (
            <svg
              width="70"
              height="85"
              viewBox="0 0 70 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="35.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <rect y="7" width="70" height="70" rx="35" fill={tableColor} />
            </svg>
          );
        }
        if (tableCapacity === 4) {
          return (
            <svg
              width="86"
              height="85"
              viewBox="0 0 86 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
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
        if (tableCapacity === 2) {
          return (
            <svg
              width="70"
              height="90"
              viewBox="0 0 70 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="35.5806" cy="82.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <rect y="10" width="70" height="70" fill={tableColor} />
            </svg>
          );
        }
        if (tableCapacity === 4) {
          return (
            <svg
              width="87"
              height="86"
              viewBox="0 0 87 86"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="7.5806" cy="44.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="78.5811" cy="44.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <ellipse cx="43.5806" cy="78.3763" rx="7.5806" ry="7.37634" fill={tableSizeColor} />
              <rect x="8" y="8" width="70" height="70" fill={tableColor} />
            </svg>
          );
        }
        break;

      default:
        return null;
    }
  };

  return (
    <div
      className={`table-reservation-container relative h-96 w-full border border-zinc-300 ${
        isDarkMode ? 'bg-gray-800 dark:bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Bouton pour basculer le thème */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 focus:outline-none z-50"
        aria-label="Changer le thème"
      >
        <FaLightbulb size={20} color={isDarkMode ? '#000' : '#000'} />
      </button>

      {/* Conteneur avec défilement horizontal uniquement pour le plan de table */}
      <div
        className="table-plan-wrapper  h-full w-full"
        style={{
          width: '830px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <div
          className="table-plan flex relative"
          style={{
            width: '1400px',
            height: '100%',
          }}
        >
          {tables.map((table) => {
            const reservationsForTable = getReservationsForTable(table);
            const status = getTableStatus(table);

            const content = (
              <div>
                <strong>Table n°{table.number}</strong>
                {reservationsForTable.length > 0 ? (
                  reservationsForTable.map((reservation) => (
                    <div key={reservation._id} className="mb-2 mt-2">
                      <strong>{reservation.user_id.firstname} {reservation.user_id.lastname}</strong><br />
                      {reservation.nbr_persons} {reservation.nbr_persons > 1 ? 'personnes' : 'personne'}<br />
                      {reservation.time_selected}<br />
                      {reservation.details && (
                        <>
                          {reservation.details}<br />
                        </>
                      )}
                      Réservation {translateStatus(reservation.status)}
                    </div>
                  ))
                ) : (
                  <div>Aucune réservation</div>
                )}
              </div>
            );

            return (
              <Tippy
                key={table._id}
                content={content}
                placement="auto"
                arrow={true}
                delay={[0, 0]}
                interactive={true}
              >
                <div
                  className={`table-container ${status === 'waiting' ? 'blink' : ''}`}
                  style={{
                    position: 'absolute',
                    left: `${table.position_x}px`,
                    top: `${table.position_y}px`,
                    cursor: 'pointer',
                  }}
                >
                  {renderTableSVG(table)}
                  <div className="number-circle">
                    <span>{table.number}</span>
                  </div>
                </div>
              </Tippy>
            );
          })}
        </div>
      </div>
    </div>
  );
};
import { useEffect, useState } from 'react';
import { http } from '../../../../Infrastructure/Http/axios.instance';
import { Table } from '../../../../Module/Types/table.type';

interface TableAreaProps {
  company: { _id: string };
  token: string | null;
}

export const TableArea: React.FC<TableAreaProps> = ({ company, token }) => {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      if (!company || !company._id || !token) {
        console.error('Company ID ou token non trouvés');
        return;
      }

      try {
        const response = await http.get(`/tables_by_filters`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        });

        console.log("Response data:", response.data);

        if (response.data && Array.isArray(response.data.results)) {
          setTables(response.data.results); // Stockez les tables de la collection Tables
        } else {
          console.error('Données de réponse inattendues:', response.data);
          setTables([]);  // Mettez à jour l'état avec un tableau vide si les données ne sont pas au format attendu
        }
      } catch (error: any) {
        console.error('Erreur lors de la récupération des tables:', error.response ? error.response.data : error.message);
        setTables([]);  // Mettez à jour l'état avec un tableau vide en cas d'erreur
      }
    };

    if (company && company._id && token) {
      fetchTables();
    }
  }, [company, token]);

  const renderTableSVG = (table: Table) => {
    if (table.shape === 'rectangle') {
      if (table.table_size === 4) {
        return (
          <svg width="123" height="74" viewBox="0 0 123 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill="#508E14" />
            <ellipse cx="32.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="90.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill="#508E14" />
            <ellipse cx="90.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill="#508E14" />
            <rect y="8" width="143" height="57" fill="#BCDB9E" />
          </svg>
        );
      }
      if (table.table_size === 6) {
        return (
          <svg width="123" height="74" viewBox="0 0 123 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="22.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill="#508E14" />
            <ellipse cx="22.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="101.45" cy="8.25806" rx="7.58057" ry="7.37635" fill="#508E14" />
            <ellipse cx="101.45" cy="66.2533" rx="7.58057" ry="7.37634" fill="#508E14" />
            <ellipse cx="63.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill="#508E14" />
            <ellipse cx="63.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill="#508E14" />
            <rect y="8" width="123" height="57" fill="#BCDB9E" />
          </svg>
        );
      }
      if (table.table_size === 8) {
        return (
          <svg width="153" height="74" viewBox="0 0 153 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="37.3326" cy="8.25806" rx="7.5806" ry="7.37635" fill="#508E14" />
            <ellipse cx="37.3326" cy="66.2533" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="8.33255" cy="36.2533" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="145.333" cy="36.2533" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="116.45" cy="8.25806" rx="7.58057" ry="7.37635" fill="#508E14" />
            <ellipse cx="116.45" cy="66.2533" rx="7.58057" ry="7.37634" fill="#508E14" />
            <ellipse cx="78.4502" cy="8.25806" rx="7.58057" ry="7.37635" fill="#508E14" />
            <ellipse cx="78.4502" cy="66.2533" rx="7.58057" ry="7.37634" fill="#508E14" />
            <rect x="10" y="8" width="134" height="57" fill="#BCDB9E" />
          </svg>
        );
      }
    } else if (table.shape === 'round') {
      if (table.table_size === 2) {
        return (
          <svg width="70" height="85" viewBox="0 0 70 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="35.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <rect y="7" width="70" height="70" rx="35" fill="#BCDB9E" />
          </svg>
        );
      }
      if (table.table_size === 4) {
        return (
          <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="43.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="7.5806" cy="42.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="77.5811" cy="42.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <rect x="8" y="7" width="70" height="70" rx="35" fill="#BCDB9E" />
          </svg>
        );
      }
    } else if (table.shape === 'square') {
      if (table.table_size === 2) {
        return (
          <svg width="70" height="90" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="35.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="35.5806" cy="82.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <rect y="10" width="70" height="70" fill="#BCDB9E" />
          </svg>
        );
      }
      if (table.table_size === 4) {
        return (
          <svg width="87" height="86" viewBox="0 0 87 86" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="7.5806" cy="44.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="78.5811" cy="44.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <ellipse cx="43.5806" cy="78.3763" rx="7.5806" ry="7.37634" fill="#508E14" />
            <path d="M8 8L78 8L78 78L8 78L8 8Z" fill="#BCDB9E" />
          </svg>
        );
      }
    }
    return null; // Valeur par défaut si aucune condition n'est remplie
  };

  return (
    <div className="max-w-4/5 h-96 ml-12 p-4 mt-6 border border-zinc-300 bg-zinc-50 dark:bg-dark-900 dark:border-dark-800 dark:text-black">
      {tables.map((table) => (
        <div key={table._id} className="table-container">
          {renderTableSVG(table)}
          <div className="number-circle">
            <span>{table.table_number}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { http } from '../../../../Infrastructure/Http/axios.instance'; // Assurez-vous que les chemins d'importation sont corrects
import { Table } from '../../../../Module/Types/table.type'; // Assurez-vous que les chemins d'importation sont corrects

export const TableArea = () => {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      const token = localStorage.getItem('token');  // Récupérez le token depuis localStorage ou une autre source
      try {
        const response = await http.get('/table_plan/2024-08-24?company_id=66b9b0604478cecc26a5f945', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTables(response.data.tables); // Assurez-vous que la réponse contient bien un tableau de tables
      } catch (error: any) {
        console.error('Erreur lors de la récupération des tables:', error.response ? error.response.data : error.message);
      }
    };

    fetchTables(); // Appel de la fonction pour récupérer les tables
  }, []);

  return (
    <div className="max-w-4/5 h-80 ml-12 p-4 mt-6 border border-zinc-300 bg-zinc-50 dark:bg-dark-900 dark:border-dark-800">
      {tables.map((table) => (
        <div key={table._id} className="table-container">
          {/* Exemple de rendu d'une table, à adapter selon vos besoins */}
          <svg width="86" height="85" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="43.5806" cy="7.37634" rx="7.5806" ry="7.37634" fill="#BCDB9E"/>
            <ellipse cx="43.5806" cy="77.3763" rx="7.5806" ry="7.37634" fill="#BCDB9E"/>
            <ellipse cx="7.5806" cy="42.3763" rx="7.5806" ry="7.37634" fill="#BCDB9E"/>
            <ellipse cx="77.5811" cy="42.3763" rx="7.5806" ry="7.37634" fill="#BCDB9E"/>
            <rect x="8" y="7" width="70" height="70" rx="35" fill="#E9FAD8"/>
          </svg>
          <div className="number-circle">
            <span>{table.table_number}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { TablePlanArea } from '../Components/Dashboard/TablePlan/TablePlanArea';
import { TableForm } from '../Components/Dashboard/TablePlan/TableForm';
import { useAuth } from '../../Module/Auth/useAuth';
import { http } from '../../Infrastructure/Http/axios.instance';
import { Table } from '../../Module/Types/table.type'; // Import du type Table

export const TablePlanPage = () => {
  const { token, restaurant } = useAuth();
  const [tables, setTables] = useState<Table[]>([]);

  const totalTables = tables.length;
  const totalSeats = tables.reduce((acc, table) => acc + table.capacity, 0);

  const fetchTables = async () => {
    if (!token || !restaurant) return;

    try {
      const response = await http.get(`/tables_by_filters`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && Array.isArray(response.data.results)) {
        setTables(response.data.results);
      }
    } catch (error: any) {
      console.error('Erreur lors de la récupération des tables:', error.message);
    }
  };

  useEffect(() => {
    document.title = 'Oresto - Plan de table';
    fetchTables();
  }, [token, restaurant]);

  // Fonction de rappel pour mettre à jour les tables
  const handleTablesUpdate = () => {
    fetchTables();
  };

  if (!restaurant || !token) {
    return <p>Chargement des données...</p>;
  }

  const restaurantObject = Array.isArray(restaurant) ? restaurant[0] : restaurant;

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-12 pl-12">Plan de table</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">{totalTables}</span> table(s)
        enregistrée(s) |{' '}
        <span className="font-bold text-red-500 dark:text-white">{totalSeats}</span> couvert(s)
      </h2>
      {/* Passer handleTablesUpdate à TableForm */}
      <TableForm onTableCreated={handleTablesUpdate} />
      {/* Passer les tables et handleTablesUpdate à TablePlanArea */}
      <TablePlanArea
        restaurant={restaurantObject}
        token={token}
        tables={tables}
        onTablesUpdate={handleTablesUpdate}
      />
    </div>
  );
};

import { useEffect, useState } from 'react';
import { TablePlanArea } from '../Components/Dashboard/TablePlan/TablePlanArea'
import { TableForm } from '../Components/Dashboard/TablePlan/TableForm';
import { useAuth } from '../../Module/Auth/useAuth';
import { http } from '../../Infrastructure/Http/axios.instance';

interface Table {
  _id: string;
  number: string;
  capacity: number;
  shape: string;
  status: string;
}

export const TablePlanPage = () => {
  const { token, restaurant } = useAuth();
  const [tables, setTables] = useState<Table[]>([]); // État pour stocker les tables

  // Calcul du nombre total de tables et du nombre total de places
  const totalTables = tables.length;
  const totalSeats = tables.reduce((acc, table) => acc + table.capacity, 0);

  useEffect(() => {
    document.title = 'Oresto - Plan de table';
    const fetchTables = async () => {
      if (!token || !restaurant) return;

      try {
        const response = await http.get(`/tables_by_filters`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.results)) {
          setTables(response.data.results); // Mettre à jour les tables avec les données de l'API
        }
      } catch (error: any) {
        console.error('Erreur lors de la récupération des tables:', error.message);
      }
    };

    fetchTables();
  }, [token, restaurant]);

  if (!restaurant || !token) {
    return <p>Chargement des données...</p>;
  }

  const restaurantObject = Array.isArray(restaurant) ? restaurant[0] : restaurant;

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-12 pl-12">Plan de table</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">{totalTables}</span> table(s) enregistrée(s)
        | <span className="font-bold text-red-500 dark:text-white">{totalSeats}</span> couvert(s)
      </h2>
      <TableForm />
      <TablePlanArea restaurant={restaurantObject} token={token} />
    </div>
  );
};

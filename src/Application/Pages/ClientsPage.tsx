import { useState, useEffect } from 'react';
import { ClientList } from "../Components/Dashboard/ClientList";
import { ClientInfos } from "../Components/Dashboard/ClientInfos";
import { useOutletContext } from 'react-router-dom';
import { User } from '../../Module/Types/user.type';
import { http } from '../../Infrastructure/Http/axios.instance';

type ContextType = { user: User | null };

export const ClientsPage = () => {
  const { user } = useOutletContext<ContextType>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await http.get('/clients_by_filters', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.results) {
          setUsers(response.data.results);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError('Erreur lors de la récupération des utilisateurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-8 pl-12">Liste des utilisateurs</h1>
      <h2 className="text-lg pl-12 mt-1 mb-8">
        <span className="font-bold text-red-500">{users.length}</span> client(s) enregistré(s) 
        | <span className="font-bold text-red-500">0</span> réservation(s)
      </h2>
      <ClientList users={users} />
      <ClientInfos />
    </div>
  );
};

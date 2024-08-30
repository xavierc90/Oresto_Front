import { useState, useEffect } from 'react';
import { ClientList } from "../Components/Dashboard/ClientList";
import { useOutletContext } from 'react-router-dom';
import { User } from '../../Module/Auth/user.type';
import { http } from '../../Infrastructure/Http/axios.instance';
import { searchService } from '../../Module/Utils/searchService';

type ContextType = { user: User | null };

export const ClientsPage = () => {
  const { user } = useOutletContext<ContextType>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await http.get('/clients_by_filters', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.results || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError('Erreur lors de la récupération des utilisateurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const subscription = searchService.getSearch().subscribe(search => {
      setSearchTerm(search);
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredUsers = users.filter(user => 
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const clientsCount = filteredUsers.length;
  const clientsText = clientsCount === 0 ? 'client trouvé' : `client${clientsCount > 1 ? 's ' : ' '}trouvé${clientsCount > 1 ? 's' : ''}`;
  const registeredText = clientsCount === 0 ? 'client enregistré' : `client${clientsCount > 1 ? 's ' : ' '}enregistré${clientsCount > 1 ? 's' : ''}`;

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-8 pl-12">Gestion des clients</h1>
      <h2 className="text-lg pl-12 mt-1 mb-8">
        <span className="font-bold text-red-500 dark:text-white">{clientsCount}</span> {searchTerm.length > 0 ? clientsText : registeredText}
        &nbsp;| <span className="font-bold text-red-500 dark:text-white"> 0</span> réservation
      </h2>
      <ClientList users={filteredUsers} />
    </div>
  );
};
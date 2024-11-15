import { useState, useEffect } from 'react';
import { ClientList } from "../Components/Dashboard/ClientList";
import { useOutletContext } from 'react-router-dom';
import { User } from '../../Module/Auth/user.type';
import { http } from '../../Infrastructure/Http/axios.instance';
import { searchService } from '../../Module/Utils/searchService';
import { BiErrorCircle } from "react-icons/bi";
import { Loader } from '../Components/Loader';

type ContextType = { user: User | null };

export const ClientsPage = () => {
  const { user } = useOutletContext<ContextType>();
  const [users, setUsers] = useState<User[]>([]);
  const [reservationsCount, setReservationsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    document.title = 'Oresto - Gestion des clients';
    
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

    const fetchReservationsCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await http.get('/reservations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservationsCount(response.data.totalReservations || 0);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        setError('Erreur lors de la récupération des réservations.');
      }
    };

    fetchUsers();
    fetchReservationsCount();
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
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const clientsCount = filteredUsers.length;
  const clientsText = clientsCount === 0 ? 'client trouvé' : `client${clientsCount > 1 ? 's ' : ' '}trouvé${clientsCount > 1 ? 's' : ''}`;
  const registeredText = clientsCount === 0 ? 'client enregistré' : `client${clientsCount > 1 ? 's ' : ' '}enregistré${clientsCount > 1 ? 's' : ''}`;
  const isDataAvailable = clientsCount > 0;

  return (
    <div className="bg-light dark:bg-gray-900 dark:text-white w-full min-h-screen flex flex-col">
      <h1 className="text-xl font-bold pt-10 pl-10">Gestion des clients</h1>
      <span className="pl-10">
        {isDataAvailable
          ? <h2 className="text-lg mt-1 mb-8">
              <span className="font-bold text-red-500 dark:text-white">{clientsCount}</span> {searchTerm.length > 0 ? clientsText : registeredText}
              &nbsp;| <span className="font-bold text-red-500 dark:text-white">{reservationsCount}</span> réservation{reservationsCount > 1 ? 's' : ''}
            </h2>
          : "Retrouvez la liste de vos clients sur cette page"}
      </span>

      {isDataAvailable ? (
        <ClientList users={filteredUsers} />
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <p className="flex flex-col justify-center items-center text-2xl font-bold text-gray-500 dark:text-gray-300 gap-2">
            <BiErrorCircle size={80} color="#d8d8d8" />
            Aucune donnée disponible
          </p>
          <article className="text-xl pt-1 dark:text-gray-400">
            Les données seront consultables dès qu'un client aura créé un compte dans votre restaurant
          </article>
        </div>
      )}
    </div>
  );
};

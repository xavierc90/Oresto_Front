import { useState } from 'react';
import { http } from '../../../Infrastructure/Http/axios.instance';
import { FaSort } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { User } from '../../../Module/Auth/user.type';
import { formatDateToFrench } from '../../../Module/Utils/dateFormatter';
import moment from 'moment';
import { RxCross1 } from 'react-icons/rx';
import { Reservation } from '../../../Module/Types/reservation.type';
import { StatusLabel } from './StatusLabel';
import { FaInfoCircle } from "react-icons/fa";

interface ClientListProps {
  users: User[];
}

export const ClientList = ({ users }: ClientListProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    try {
      const response = await http.get<Reservation[]>(`/reservations/user/${user._id}`);
      const sortedReservations = response.data.sort((a, b) => new Date(b.date_selected).getTime() - new Date(a.date_selected).getTime());
      setReservations(sortedReservations);  // Assign sorted reservation data directly
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setReservations([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setReservations([]);
  };

  const sortedUsers = sortOrder === 'asc' ? users.sort((a, b) => a.lastname.localeCompare(b.lastname)) : users.sort((a, b) => b.lastname.localeCompare(a.lastname));

  return (
    <div className="scrollable-list">
      {sortedUsers.length === 0 ? (
        <div className="ml-12 mt-8 text-sm">Aucun client trouvé</div>
      ) : (
        <table className="ml-12 w-full">
          <thead>
            <tr>
              <th className="text-left flex items-center gap-1">Nom<span><FaSort onClick={handleSortToggle} className="cursor-pointer" /></span></th>
              <th className="text-left">Prénom</th>
              <th className="text-left">N° de téléphone</th>
              <th className="text-left">Date d'inscription</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user: User) => (
              <tr key={user._id} onClick={() => handleUserClick(user)} className="hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-dark-900 dark:hover:text-white">
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td className="py-1">{user.phone_number}</td>
                <td>{formatDateToFrench(user.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-700 hover:text-black" onClick={handleCloseModal}>
              <RxCross1 size={25} />
            </button>
           
            <h2 className="font-bold mb-5 flex items-center">
            <FaUser />
            <span className='pl-2'>Informations du client</span>
            </h2>

            <ul className='space-y-2 text-sm'>
              <li className='font-semibold'>Nom : <span className='font-normal'>{selectedUser.lastname}</span></li>
              <li className='font-semibold'>Prénom : <span className='font-normal'>{selectedUser.firstname}</span></li>
              <li className='font-semibold'>Email : <span className='font-normal'>{selectedUser.email}</span></li>
              <li className='font-semibold'>N° de téléphone : <span className='font-normal'>{selectedUser.phone_number}</span></li>
              <li className='font-semibold'>Allergènes : <span className='font-normal'>{Array.isArray(selectedUser.allergens) && selectedUser.allergens.length > 0 ? selectedUser.allergens.join(', ') : 'Aucune allergie renseignée'}</span></li>
              <li className='font-semibold'>Inscrit depuis le : <span className='font-normal'>{formatDateToFrench(selectedUser.created_at)}</span></li>
            </ul>
            
            <h2 className="font-bold mt-6 mb-5 flex items-center">
            <FaRegCalendarAlt />
            <span className='pl-2'>Historique des réservations</span>
            </h2>
            <div className='reservation-list'>
            {reservations.length > 0 ? (
              <ul className='list-none'>
                {reservations.map(reservation => (
                  <ul key={reservation._id} className='mb-3 text-sm space-y-1'>
                    <li className='font-semibold flex gap-2'>{moment(reservation.date_selected).format('DD/MM/YYYY')} à {reservation.time_selected}
                      <StatusLabel status={reservation.status || 'waiting'} />
                    </li>
                    <li>Table {reservation.table[0]?.number} pour {reservation.nbr_persons || '0'} personnes</li>
                    <li className='flex items-center'>
                      {reservation.details && <FaInfoCircle className="mr-2" />}
                      {reservation.details ? reservation.details : ''}
                    </li>
                  </ul>
                ))}
              </ul>
            ) : (
              <p>Aucune réservation trouvée pour cette personne.</p>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

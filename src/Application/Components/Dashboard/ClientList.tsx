import { useState, useEffect } from 'react';
import { http } from '../../../Infrastructure/Http/axios.instance';
import { FaSort } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { User } from '../../../Module/Auth/user.type';
import { formatDateToFrench } from '../../../Module/Utils/dateFormatter';
import { formatDateWithoutTime } from '../../../Module/Utils/dateFormatterWithoutHour';
import moment from 'moment';
import { RxCross1 } from 'react-icons/rx';
import { Booking } from '../../../Module/Types/bookng.type';
import { StatusLabel } from './StatusLabel';

interface ClientListProps {
  users: User[];
}

export const ClientList = ({ users }: ClientListProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [usersWithCounts, setUsersWithCounts] = useState<User[]>([]);

  useEffect(() => {
    const loadBookingsCount = async () => {
      const usersWithBookingCounts = await Promise.all(users.map(async user => {
        try {
          const response = await http.get<{ count: number }>(`/bookings/count/user/${user._id}`);
          return { ...user, bookingCount: response.data.count };
        } catch (error) {
          console.error('Error fetching booking count:', error);
          return { ...user, bookingCount: 0 };
        }
      }));
      setUsersWithCounts(usersWithBookingCounts);
    };

    loadBookingsCount();
  }, [users]);

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleUserClick = async (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    try {
      const response = await http.get<Booking[]>(`/bookings/user/${user._id}`);
      setBookings(response.data);  // Assign booking data directly
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setBookings([]);
  };

  const sortedUsers = sortOrder === 'asc' ? usersWithCounts.sort((a, b) => a.lastname.localeCompare(b.lastname)) : usersWithCounts.sort((a, b) => b.lastname.localeCompare(a.lastname));

  return (
    <div className="scrollable-list">
      {sortedUsers.length === 0 ? (
        <div className="ml-12 mt-8 text-lg">Aucun client trouvé</div>
      ) : (
        <table className="ml-12 w-full">
          <thead>
            <tr>
              <th className="text-left flex items-center gap-1">Nom<span><FaSort onClick={handleSortToggle} className="cursor-pointer" /></span></th>
              <th className="text-left">Prénom</th>
              <th className="text-left">N° de téléphone</th>
              <th className="text-left">Date d'inscription</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user: User) => (
              <tr key={user._id} onClick={() => handleUserClick(user)} className="hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-dark-900 dark:hover:text-white">
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td className="py-2">{user.phone_number}</td>
                <td>{formatDateToFrench(user.created_at)}</td>
                <td><StatusLabel status={user.status ? user.status : 'waiting'} /></td>
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
            <div className='booking-list'>
            {bookings.length > 0 ? (
              <ul className='list-none'>
                {bookings.map(booking => (
                  <ul key={booking._id} className='mb-3 text-sm space-y-1'>
                     <li className='font-semibold flex gap-2'>{moment(booking.date_selected).format('DD/MM/YYYY')} à {booking.time_selected}
                     <StatusLabel status={booking.status || 'waiting'} /></li>
                      <li>Table {booking.table[0].table_number} pour {booking.nbr_persons} personnes</li>
                    <li>{booking.details ? booking.details : ''}</li>
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

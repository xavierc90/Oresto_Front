import React, { useState } from 'react';
import { FaSort } from "react-icons/fa";
import { Booking } from '../../../Module/Types/bookng.type';

interface BookingListProps {
  bookings: Booking[];
}

export const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortClick = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const timeA = a.time_selected;
    const timeB = b.time_selected;

    if (sortOrder === 'asc') {
      return timeA.localeCompare(timeB);
    } else {
      return timeB.localeCompare(timeA);
    }
  });

  return (
    <div className="scrollable-container">
      <table className="mt-8 ml-12">
        <thead>
          <tr>
            <th
              className="text-left min-w-[100px] flex items-center gap-1 cursor-pointer"
              onClick={handleSortClick}
            >
              Heure <FaSort />
            </th>
            <th className="text-left min-w-[150px]">Nom</th>
            <th className="text-left min-w-[150px]">Prénom</th>
            <th className="text-center min-w-[150px]">Nbr de couverts</th>
            <th className="text-center min-w-[180px]">N° de table</th>
            <th className="text-center w-auto flex items-center gap-1">Statut de la réservation <FaSort /></th>
          </tr>
        </thead>
        <tbody className="bookinglist">
          {sortedBookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-dark-900 dark:hover:text-white">
              <td className="text-left">{booking.time_selected}</td>
              <td className="text-left">{booking.user_id.lastname}</td>
              <td className="text-left">{booking.user_id.firstname}</td>
              <td className="text-center">{booking.nbr_persons} {booking.nbr_persons > 1 ? 'personnes' : 'personne'}</td>
              <td className="text-center">4</td>
              <td className="text-center">
                <span className={`px-7 py-1 text-sm font-semibold ${
                  booking.status === 'waiting' ? 'bg-orange-500 text-white' :
                  booking.status === 'confirmed' ? 'bg-green-700 text-white' : 
                  booking.status === 'archived' ? 'bg-grey-600 text-white' : 
                  booking.status === 'canceled' ? 'bg-red-600 text-white px-9' : ''
                }`}>
                  {booking.status === 'waiting' && 'En attente'}
                  {booking.status === 'confirmed' && 'Confirmée'}
                  {booking.status === 'archived' && 'Validée'}
                  {booking.status === 'canceled' && 'Annulée'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

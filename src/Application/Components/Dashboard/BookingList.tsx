import React, { useState } from 'react';
import { FaSort, FaTimes } from "react-icons/fa";
import { Booking } from '../../../Module/Types/bookng.type';
import { http } from '../../../Infrastructure/Http/axios.instance';
import { NotificationMessage } from '../NotificationMessage';

interface BookingListProps {
  bookings: Booking[];
}

export const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string | null; type: 'success' | 'error' }>({ message: null, type: 'success' });

  const handleSortClick = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setNotification({ message: null, type: 'success' });
  };

  const handleConfirmBooking = async () => {
    if (selectedBooking) {
      try {
        const response = await http.post(`/confirm_booking/${selectedBooking._id}`);
        if (response.status === 200) {
          setNotification({ message: "La réservation a été confirmée avec succès.", type: 'success' });
        } else {
          setNotification({ message: "Erreur lors de la confirmation de la réservation.", type: 'error' });
        }
      } catch (error) {
        setNotification({ message: "Erreur lors de la confirmation de la réservation.", type: 'error' });
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  const handleCancelBooking = async () => {
    if (selectedBooking) {
      try {
        const response = await http.post(`/cancel_booking/${selectedBooking._id}`);
        if (response.status === 200) {
          setNotification({ message: "La réservation a été annulée avec succès.", type: 'success' });
        } else {
          setNotification({ message: "Erreur lors de l'annulation de la réservation.", type: 'error' });
        }
      } catch (error) {
        setNotification({ message: "Erreur lors de l'annulation de la réservation.", type: 'error' });
      } finally {
        setIsModalOpen(false);
      }
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const timeA = a.time_selected;
    const timeB = b.time_selected;

    return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
  });

  return (
    <div className="scrollable-container">
      <table className="mt-8 ml-12">
        <thead>
          <tr>
            <th className="text-left min-w-[100px] flex items-center gap-1 cursor-pointer" onClick={handleSortClick}>
              Heure <FaSort />
            </th>
            <th className="text-left min-w-[150px]">Nom</th>
            <th className="text-center min-w-[150px]">Nbr de couverts</th>
            <th className="text-center min-w-[180px]">Table</th>
            <th className="text-center min-w-[180px]">Détails</th>
            <th className="text-center w-auto flex items-center justify-center gap-1">Statut<FaSort /></th>
          </tr>
        </thead>
        <tbody className="bookinglist">
          {sortedBookings.map((booking) => (
            <tr 
              key={booking._id} 
              className="hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-dark-900 dark:hover:text-white"
              onClick={() => handleBookingClick(booking)}
            >
              <td className="text-left">{booking.time_selected}</td>
              <td className="text-left">{booking.user_id.lastname}</td>
              <td className="text-center">{booking.nbr_persons} {booking.nbr_persons > 1 ? 'personnes' : 'personne'}</td>
              <td className="text-center">{booking.table && booking.table[0]?.table_number || 'N/A'}</td>
              <td className="text-center">{booking.details || 'Aucun'}</td>
              <td className="text-center">
                <span className={`px-7 py-1 text-sm font-semibold ${
                  booking.status === 'waiting' ? 'bg-orange-500 text-white' :
                  booking.status === 'confirmed' ? 'bg-green-700 text-white' : 
                  booking.status === 'archived' ? 'bg-gray-200 text-gray-900' : 
                  booking.status === 'canceled' ? 'bg-red-600 text-white px-9' : ''
                }`}>
                  {booking.status === 'waiting' && 'En attente'}
                  {booking.status === 'confirmed' && 'Confirmée'}
                  {booking.status === 'archived' && 'Archivée'}
                  {booking.status === 'canceled' && 'Annulée'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon */}
            <button 
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={handleCloseModal}
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Détails de la réservation</h2>
            <p><strong>Nom :</strong> {selectedBooking.user_id.firstname} {selectedBooking.user_id.lastname}</p>
            <p><strong>Email :</strong> {selectedBooking.user_id.email}</p>
            <p><strong>N° de téléphone :</strong> {selectedBooking.user_id.phone_number}</p>
            <p><strong>Allergènes :</strong> {Array.isArray(selectedBooking.user_id.allergens) && selectedBooking.user_id.allergens.length > 0 ? selectedBooking.user_id.allergens.join(', ') : 'Aucune allergie signalée'}</p>            <p><strong>Heure :</strong> {selectedBooking.time_selected}</p>
            <p><strong>Date :</strong> {new Date(selectedBooking.date_selected).toLocaleDateString()}</p>
            <p><strong>Nombre de couverts :</strong> {selectedBooking.nbr_persons}</p>
            <p><strong>Table :</strong> {selectedBooking.table && selectedBooking.table[0]?.table_number || 'N/A'}</p>
            <p><strong>Détails :</strong> {selectedBooking.details || 'Aucun'}</p>
            <div className="mt-8 flex justify-center gap-4">
              {selectedBooking.status !== 'confirmed' && (
                <button className="bg-green-800 text-white font-semibold px-4 py-2 rounded-lg" onClick={handleConfirmBooking}>
                  Confirmer la réservation
                </button>
              )}
              {selectedBooking.status !== 'canceled' && (
                <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg" onClick={handleCancelBooking}>
                  Annuler la réservation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Message de notification */}
      {notification.message && (
        <NotificationMessage message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

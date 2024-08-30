import React, { useState } from 'react';
import { FaSort, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { http } from '../../../Infrastructure/Http/axios.instance';
import { NotificationMessage } from '../NotificationMessage';
import { StatusLabel } from './StatusLabel';
import { RxCross1 } from 'react-icons/rx';
import { ImCross } from 'react-icons/im';
import { Booking } from '../../../Module/Types/bookng.type';

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

  const handleUpdateBooking = async () => {
    if (selectedBooking) {
      try {
        const response = await http.post(`/update_booking/${selectedBooking._id}`);
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
            <th className="text-left min-w-[150px]">Prénom</th>
            <th className="text-center min-w-[150px]">Nbr de couverts</th>
            <th className="text-center min-w-[180px]">Table</th>
            <th className="text-left flex items-center justify-left gap-1">Etat réservation<FaSort /></th>
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
              <td className="text-left">{booking.user_id.firstname}</td>
              <td className="text-center">{booking.nbr_persons} {booking.nbr_persons > 1 ? 'personnes' : 'personne'}</td>
              <td className="text-center">{booking.table && booking.table[0]?.table_number || 'N/A'}</td>
              <td className="text-left"><StatusLabel status={booking.status ? booking.status : 'waiting'} /></td>
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
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon */}
            <button 
              className="absolute top-4 right-4 text-gray-700 hover:text-black dark:text-white dark:hover:text-white"
              onClick={handleCloseModal}
            >
              <RxCross1 size={25} />
            </button>

            <h2 className="text-xl font-bold mb-2 mt-8 text-center">Détail de la réservation</h2>
            <div className='flex justify-center mt-5'>
              <h3 className='flex justify-center mb-6 text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl lg:w-3/3'><StatusLabel status={selectedBooking.status} /></h3>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <ul className="list-none pl-5 space-y-1">
              <li><strong>Au nom de :</strong> {selectedBooking.user_id.firstname} {selectedBooking.user_id.lastname}</li>
              <li><strong>Email :</strong> {selectedBooking.user_id.email}</li>
              <li><strong>N° de téléphone :</strong> {selectedBooking.user_id.phone_number}</li>
              <li><strong>Allergènes :</strong> {Array.isArray(selectedBooking.user_id.allergens) && selectedBooking.user_id.allergens.length > 0 ? selectedBooking.user_id.allergens.join(', ') : 'Aucune allergie signalée'}</li>
              <li><strong>Heure :</strong> {selectedBooking.time_selected}</li>
              <li><strong>Date :</strong> {new Date(selectedBooking.date_selected).toLocaleDateString()}</li>
              <li><strong>Nombre de couverts :</strong> {selectedBooking.nbr_persons}</li>
              <li><strong>Table :</strong> {selectedBooking.table && selectedBooking.table[0]?.table_number || 'N/A'}</li>
              <li><strong>Détails :</strong> {selectedBooking.details || 'Aucun'}</li>
            </ul>
            </div>
<div className="mt-8 flex justify-center gap-4 ">
              {selectedBooking.status !== 'confirmed' && (
                <button className="bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center" onClick={handleConfirmBooking}>
                  <FaCheck size={10} />
                  <span className='ml-2'>Confirmer</span>
                </button>  
              )}
              {selectedBooking.status !== 'edited' && (
                <button className="bg-black text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center" onClick={handleUpdateBooking}>
                  <GrEdit size={10} />
                  <span className='ml-2'>Modifier</span>
                </button>  
              )}
              {selectedBooking.status !== 'canceled' && (
                <button className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center" onClick={handleCancelBooking}>
                  <ImCross size={10} />
                  <span className='ml-2'>Annuler</span>
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

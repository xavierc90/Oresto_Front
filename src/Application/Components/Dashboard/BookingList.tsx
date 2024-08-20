import { FaSort } from "react-icons/fa";
import { Booking } from '../../../Module/Types/bookng.type'; // Assurez-vous d'importer correctement le type

interface BookingListProps {
  bookings: Booking[];
}

export const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div className="scrollable-container">
      <table className="mt-8 ml-12 table-auto">
        <thead>
          <tr>
            <th className="text-center min-w-[100px] flex items-center gap-1">Heure <FaSort /></th>
            <th className="text-center min-w-[150px]">Nom</th>
            <th className="text-center min-w-[150px]">Couverts</th>
            <th className="text-center min-w-[180px]">N° de table</th>
            <th className="text-center min-w-[150px] flex items-center gap-1">Status <FaSort /></th>
            <th className="text-center min-w-[150px]">Actions</th>
          </tr>
        </thead>
        <tbody className="bookinglist">
          {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-200 hover:cursor-pointer">
              <td className="text-center">{booking.time_selected}</td>
              <td className="text-center">{booking.user_id.lastname}</td>
              <td className="text-center">{booking.nbr_persons} {booking.nbr_persons > 1 ? 'personnes' : 'personne'}</td>
              <td className="text-center">{booking.table_id.table_number}</td>
              <td className="text-center">
                <span className={`px-7 py-1 text-sm font-semibold ${
                  booking.status === 'confirmed' ? 'bg-green-600 text-white' : 
                  booking.status === 'validated' ? 'bg-green-600 text-white' : 
                  booking.status === 'waiting' ? 'bg-amber-500 text-white' : 
                  'bg-red-600 text-white'
                }`}>
                  {booking.status === 'confirmed' && 'Confirmée'}
                  {booking.status === 'validated' && 'Validée'}
                  {booking.status === 'waiting' && 'En attente'}
                  {booking.status === 'canceled' && 'Annulée'}
                </span>
              </td>
              <td className="text-center">Modifier | Annuler</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

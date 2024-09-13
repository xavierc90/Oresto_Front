import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BookingList } from '../Components/Dashboard/BookingList';
import { formatDateWithoutTime } from '../../Module/Utils/dateFormatterWithoutHour';
import { dateService } from '../../Module/Utils/dateService';
import { http } from '../../Infrastructure/Http/axios.instance';
import { Booking } from '../../Module/Types/bookng.type';
import { TableBookingArea } from '../Components/Dashboard/TablePlan/TableBookingArea';

interface OutletContextType {
  user: any;
  company: any;
  token: string;
}

export const BookingsPage = () => {
  const { user, company, token } = useOutletContext<OutletContextType>();

  console.log("Token dans useOutletContext:", token);
  console.log("User dans useOutletContext:", user);
  console.log("Company dans useOutletContext:", company);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    console.log("UseEffect triggered - Checking token, user, company");

    if (!token || !user || !company) {
      console.error("Token, utilisateur ou entreprise manquants. Redirection vers la page de connexion...");
      return;
    }

    console.log("Subscribing to dateService for date updates...");
    const subscription = dateService.getDate().subscribe(date => {
      console.log("Date received from dateService:", date);
      setSelectedDate(date);
      fetchBookings(date, token, user._id, company._id);
    });

    return () => {
      console.log("Unsubscribing from dateService...");
      subscription.unsubscribe();
    };
  }, [token, user, company]);

  const fetchBookings = async (date: Date, token: string, userId: string, companyId: string) => {
    try {
      console.log("Fetching bookings for date:", date);
      const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const formattedDate = normalizedDate.toISOString().split('T')[0];
      console.log("Formatted date for booking query:", formattedDate);

      const response = await http.get(`/bookings/${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          userId,
          companyId
        }
      });
      console.log("Réservations récupérées avec succès :", response.data);
      setBookings(response.data);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des réservations:', error);
      if (error.response && error.response.status === 401) {
        console.error("Non autorisé. Redirection vers la page de connexion...");
      }
    }
  };

  const totalCovers = bookings
    .filter(booking => booking.status !== 'canceled')
    .reduce((sum, booking) => sum + booking.nbr_persons, 0);

  const validBookings = bookings.filter(booking => booking.status !== 'canceled').length;

  console.log("Selected Date:", selectedDate);
  console.log("Bookings:", bookings);

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-12 pl-12">
        {selectedDate ? formatDateWithoutTime(selectedDate.toISOString()) : 'Sélectionnez une date'}
      </h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">{validBookings}</span> réservation{validBookings > 1 ? 's ' : ' '}
        | <span className="font-bold text-red-500 dark:text-white">{totalCovers}</span> couvert{totalCovers > 1 ? 's ' : ' '}
      </h2>
      <BookingList bookings={bookings} />
      <TableBookingArea selectedDate={selectedDate} company={company} token={token} />
    </div>
  );
};

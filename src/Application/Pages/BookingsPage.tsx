import { useEffect, useState } from 'react';
import { BookingList } from '../Components/Dashboard/BookingList';
import { TableArea } from '../Components/Dashboard/TablePlan/TableArea';
import { formatDateWithoutTime } from '../../Module/Utils/dateFormatterWithoutHour';
import { dateService } from '../../Module/Utils/dateService';
import { http } from '../../Infrastructure/Http/axios.instance';
import { Booking } from '../../Module/Types/bookng.type';

export const BookingsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const subscription = dateService.getDate().subscribe(date => {
      setSelectedDate(date);
      fetchBookings(date);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchBookings = async (date: Date) => {
    const token = localStorage.getItem('token');
    try {
      const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const formattedDate = normalizedDate.toISOString().split('T')[0];

      const response = await http.get(`/bookings/${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  };

  // Calcul du nombre total de couverts en excluant les réservations annulées
  const totalCovers = bookings
    .filter(booking => booking.status !== 'canceled') // Exclure les réservations annulées
    .reduce((sum, booking) => sum + booking.nbr_persons, 0);

  // Calcul du nombre total de réservations en excluant les réservations annulées
  const validBookings = bookings.filter(booking => booking.status !== 'canceled').length;

  return (
    <div className="bg-light w-full mb-4">
      <h1 className="text-xl font-bold pt-8 pl-12">
        {selectedDate ? formatDateWithoutTime(selectedDate.toISOString()) : 'Sélectionnez une date'}
      </h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">{validBookings}</span> réservation{validBookings > 1 ? 's ' : ' '}
        | <span className="font-bold text-red-500 dark:text-white">{totalCovers}</span> couvert{totalCovers > 1 ? 's ' : ' '}
      </h2>
      <BookingList bookings={bookings} />
      <TableArea />
    </div>
  );
};

import { useEffect, useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ReservationList } from '../Components/Dashboard/ReservationList';
import { formatDateWithoutTime } from '../../Module/Utils/dateFormatterWithoutHour';
import { dateService } from '../../Module/Utils/dateService';
import { http } from '../../Infrastructure/Http/axios.instance';
import { Reservation } from '../../Module/Types/reservation.type';
import { TableReservationArea } from '../Components/Dashboard/TablePlan/TableReservationArea';

interface OutletContextType {
  user: any;
  restaurant: any;
  token: string;
}

export const ReservationsPage = () => {
  const { user, token } = useOutletContext<OutletContextType>();

  const restaurant = user?.restaurant?.[0];
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    document.title = 'Oresto - Réservations';
    if (!token || !user || !restaurant) {
      console.error("Token, utilisateur ou entreprise manquants. Redirection vers la page de connexion...");
      return;
    }

    const subscription = dateService.getDate().subscribe(date => {
      setSelectedDate(date);
      fetchReservations(date);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [token, user, restaurant]);

  const fetchReservations = useCallback(async (date: Date) => {
    if (!token || !user || !restaurant) {
      console.error("Token, utilisateur ou entreprise manquants. Impossible de récupérer les réservations.");
      return;
    }

    try {
      const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const formattedDate = normalizedDate.toISOString().split('T')[0];

      const response = await http.get(`/reservations/${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          userId: user._id,
          restaurantId: restaurant._id
        }
      });
      setReservations(response.data);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des réservations:', error);
      if (error.response && error.response.status === 401) {
        console.error("Non autorisé. Redirection vers la page de connexion...");
      }
    }
  }, [token, user, restaurant]);

  const totalCovers = reservations
    .filter(reservation => reservation.status !== 'canceled')
    .reduce((sum, reservation) => sum + reservation.nbr_persons, 0);

  const validReservations = reservations.filter(reservation => reservation.status !== 'canceled').length;

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-10 pl-12">
        {selectedDate ? formatDateWithoutTime(selectedDate.toISOString()) : 'Sélectionnez une date'}
      </h1>
      <h2 className="text-lg pl-12 mt-1 mb-3">
        <span className="font-bold text-red-500 dark:text-white">{validReservations}</span> réservation{validReservations > 1 ? 's ' : ' '}
        | <span className="font-bold text-red-500 dark:text-white">{totalCovers}</span> couvert{totalCovers > 1 ? 's ' : ' '}
      </h2>
      <ReservationList
        reservations={reservations}
        fetchReservations={fetchReservations}
        selectedDate={selectedDate}
      />
      <TableReservationArea
        selectedDate={selectedDate}
        reservations={reservations}
        restaurant={restaurant}
        token={token}
      />
    </div>
  );
};

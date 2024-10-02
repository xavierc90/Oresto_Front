// ReservationsPage.tsx

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

  // États des filtres
  const [hideCanceled, setHideCanceled] = useState(false);
  const [hideConfirmed, setHideConfirmed] = useState(false);
  const [hideWaiting, setHideWaiting] = useState(false);

  // Déplacer fetchReservations AVANT le useEffect
  const fetchReservations = useCallback(
    async (date: Date) => {
      if (!token || !user || !restaurant) {
        console.error(
          "Token, utilisateur ou entreprise manquants. Impossible de récupérer les réservations."
        );
        return;
      }

      try {
        const normalizedDate = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );
        const formattedDate = normalizedDate.toISOString().split('T')[0];

        const response = await http.get(`/reservations/${formattedDate}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            userId: user._id,
            restaurantId: restaurant._id,
          },
        });
        setReservations(response.data);
      } catch (error: any) {
        console.error('Erreur lors de la récupération des réservations:', error);
        if (error.response && error.response.status === 401) {
          console.error("Non autorisé. Redirection vers la page de connexion...");
        }
      }
    },
    [token, user, restaurant]
  );

  useEffect(() => {
    document.title = 'Oresto - Réservations';
    if (!token || !user || !restaurant) {
      console.error(
        "Token, utilisateur ou entreprise manquants. Redirection vers la page de connexion..."
      );
      return;
    }

    const subscription = dateService.getDate().subscribe((date) => {
      setSelectedDate(date);
      fetchReservations(date);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [token, user, restaurant, fetchReservations]);

  // Calculer les réservations en fonction des filtres
  const filteredReservations = reservations.filter((reservation) => {
    if (hideCanceled && reservation.status === 'canceled') return false;
    if (hideConfirmed && reservation.status === 'confirmed') return false;
    if (hideWaiting && reservation.status === 'waiting') return false;
    return true;
  });

  const totalCovers = filteredReservations.reduce(
    (sum, reservation) => sum + reservation.nbr_persons,
    0
  );

  const validReservations = filteredReservations.length;

  return (
    <div className="bg-light w-full">
      {/* Utilisation de flex pour aligner les blocs à gauche et à droite */}
      <div className="flex justify-between items-start pt-10 pl-10 pr-12">
        {/* Bloc de gauche avec la date et le nombre de réservations */}
        <div>
          <div className="text-sm md:text-xl font-bold">
            {selectedDate
              ? formatDateWithoutTime(selectedDate.toISOString())
              : 'Sélectionnez une date'}
          </div>
          <div className="text-sm lg:text-lg mt-1">
            <span className="font-bold text-red-500 dark:text-white">
              {validReservations}
            </span>{' '}
            réservation{validReservations > 1 ? 's ' : ' '}
            |{' '}
            <span className="font-bold text-red-500 dark:text-white">
              {totalCovers}
            </span>{' '}
            couvert{totalCovers > 1 ? 's ' : ' '}
          </div>
        </div>
  
        {/* Bloc de droite avec les filtres */}
        <div className="flex flex-col text-sm gap-2">
          <span className='font-semibold'>Filtrer par statut</span>
          <div className='flex gap-3'>
            {/* Filtre pour "Annulées" */}
            <label className="hidden lg:inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!hideCanceled}
                onChange={() => setHideCanceled((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Annulées
              </span>
            </label>
  
            {/* Filtre pour "En attente" */}
            <label className="hidden lg:inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!hideWaiting}
                onChange={() => setHideWaiting((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                En attente
              </span>
            </label>
  
            {/* Filtre pour "Confirmées" */}
            <label className="hidden lg:inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!hideConfirmed}
                onChange={() => setHideConfirmed((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
              after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
              after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Confirmées
              </span>
            </label>
          </div>
        </div>
      </div>
  
      {/* Composants pour la liste des réservations et la gestion des tables */}
      <ReservationList
        reservations={filteredReservations}
        fetchReservations={fetchReservations}
        selectedDate={selectedDate}
      />
      <TableReservationArea
        selectedDate={selectedDate}
        reservations={reservations}
        restaurant={restaurant}
        token={token}
        isOpen={true}
      />
    </div>
  );
}
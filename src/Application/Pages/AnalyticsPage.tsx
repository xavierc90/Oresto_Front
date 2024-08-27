import React, { useState, useEffect } from "react";
import { http } from "../../Infrastructure/Http/axios.instance";

export const AnalyticsPage = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalConfirmedBookings, settotalConfirmedBookings] = useState(0);
  const [totalCanceledBookings, settotalCanceledBooking] = useState(0);
  const [totalWaitingBookings, settotalWaitingBooking] = useState(0);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await http.get('/bookings');
        // Assurez-vous que la réponse contient un champ totalBookings
        setTotalBookings(response.data.bookings.length);
        settotalConfirmedBookings(response.data.statusCounts.confirmed);
        settotalCanceledBooking(response.data.statusCounts.canceled);
        settotalWaitingBooking(response.data.statusCounts.waiting);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de réservations:', error);
      }
    };

    fetchTotalBookings();
  }, []);

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-8 pl-12">Statistiques</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">{totalBookings}</span> réservation{totalBookings > 1 ? 's' : ''} au total
      </h2>
      <ul className="pl-12 pt-12">
      <li className="text-lg font-bold">Réservations</li>
      <li className="text-sm italic mb-4">Les statistiques correspondent à l'année en cours</li>
      </ul>
      <ul className="pl-12 flex gap-4">
      <li>Confirmées : {totalConfirmedBookings}</li>
      <li>Annulées : {totalCanceledBookings}</li>
      <li>En attente : {totalWaitingBookings}</li>
      </ul>
    </div>
  );
};

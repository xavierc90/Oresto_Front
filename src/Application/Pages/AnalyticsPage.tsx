import React, { useState, useEffect } from "react";
import { http } from "../../Infrastructure/Http/axios.instance";

export const AnalyticsPage = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalConfirmedBookings, settotalConfirmedBookings] = useState(0);
  const [totalCanceledBookings, settotalCanceledBooking] = useState(0);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await http.get('/bookings');
        // Assurez-vous que la réponse contient un champ totalBookings
        setTotalBookings(response.data.totalBookings);
        settotalConfirmedBookings(response.data.totalConfirmedBookings);
        settotalCanceledBooking(response.data.totalCanceledBooking);
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
      <li className="text-lg font-bold">Période annuelle</li>
      <li>Réservations confirmées : {totalConfirmedBookings}</li>
      <li>Réservations annulées : {totalCanceledBookings}</li>
      </ul>
    </div>
  );
};

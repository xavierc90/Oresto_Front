import React, { useState, useEffect } from "react";
import { http } from "../../Infrastructure/Http/axios.instance";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';

// Enregistrer les composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const AnalyticsPage = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalConfirmedBookings, setTotalConfirmedBookings] = useState(0);
  const [totalCanceledBookings, setTotalCanceledBookings] = useState(0);
  const [totalWaitingBookings, setTotalWaitingBookings] = useState(0);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await http.get('/bookings');
        setTotalBookings(response.data.bookings.length);
        setTotalConfirmedBookings(response.data.statusCounts.confirmed);
        setTotalCanceledBookings(response.data.statusCounts.canceled);
        setTotalWaitingBookings(response.data.statusCounts.waiting);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de réservations:', error);
      }
    };

    fetchTotalBookings();
  }, []);

  // Données du graphique
  const data = {
    labels: ['Confirmées', 'Annulées', 'En attente'],
    datasets: [
      {
        data: [totalConfirmedBookings, totalCanceledBookings, totalWaitingBookings],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
        borderColor: '#ffffff',
        borderWidth: 1
      }
    ]
  };

  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    maintainAspectRatio: false // Assure que le graphique utilise la taille du conteneur
  };

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
      <div className="pl-12 pt-8 chart-container" style={{ position: 'relative', height: '300px', width: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

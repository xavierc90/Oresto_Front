import React, { useState, useEffect } from "react";
import { http } from "../../Infrastructure/Http/axios.instance";
import { Doughnut } from 'react-chartjs-2'; // Remplacez Pie par Doughnut
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';

// Enregistrer les composants nécessaires
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const AnalyticsPage = () => {
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalConfirmedReservations, setTotalConfirmedReservations] = useState(0);
  const [totalCanceledReservations, setTotalCanceledReservations] = useState(0);
  const [totalWaitingReservations, setTotalWaitingReservations] = useState(0);

  useEffect(() => {
    const fetchTotalReservations = async () => {
      try {
        const response = await http.get('/reservations');
        setTotalReservations(response.data.reservations.length);
        setTotalConfirmedReservations(response.data.statusCounts.confirmed);
        setTotalCanceledReservations(response.data.statusCounts.canceled);
        setTotalWaitingReservations(response.data.statusCounts.waiting);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de réservations:', error);
      }
    };

    fetchTotalReservations();
  }, []);

  // Données du graphique
  const data = {
    labels: ['Confirmées', 'Annulées', 'En attente'],
    datasets: [
      {
        data: [totalConfirmedReservations, totalCanceledReservations, totalWaitingReservations],
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
        display: false,
        position: 'top' as const, // Position de la légende
      },
      title: {
        display: false,
        text: 'Statistiques des Réservations', // Titre du graphique
        font: {
          size: 20
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const dataset = tooltipItem.dataset.data;
            const total = dataset.reduce((acc: number, value: number) => acc + value, 0);
            const currentValue = dataset[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2); // Calcul du pourcentage
            return `${tooltipItem.label}: ${currentValue} (${percentage}%)`; // Affiche le label, la valeur et le pourcentage
          }
        }
      }
    },
    maintainAspectRatio: false // Assure que le graphique utilise la taille du conteneur
  };

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-12 pl-12">Statistiques</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">{totalReservations}</span> réservation{totalReservations > 1 ? 's' : ''} au total
      </h2>
      <ul className="pl-12 pt-12">
        <li className="text-lg font-bold">Réservations</li>
        <li className="text-sm italic mb-8">Les statistiques correspondent à l'année en cours</li>
      </ul>
      <div className="flex items-center pl-12 gap-6">
        <div className="chart-container" style={{ position: 'relative', height: '200px', width: '200px' }}>
          <Doughnut data={data} options={options} />
        </div>
        <ul className="flex flex-col gap-4 pr-8">
          <li className="flex items-center">
            <span className="w-[20px] h-[20px] bg-[#4CAF50] rounded-full inline-block mr-2"></span>
            <span className="font-semibold text-sm">Confirmées : {totalConfirmedReservations}</span>
          </li>
          <li className="flex items-center">
            <span className="w-[20px] h-[20px] bg-[#FFC107] rounded-full inline-block mr-2"></span>
            <span className="font-semibold text-sm">En attente : {totalWaitingReservations}</span>
          </li>
          <li className="flex items-center">
            <span className="w-[20px] h-[20px] bg-[#F44336] rounded-full inline-block mr-2"></span>
            <span className="font-semibold text-sm">Annulées : {totalCanceledReservations}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

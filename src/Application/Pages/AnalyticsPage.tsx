import React, { useState, useEffect } from "react";
import { http } from "../../Infrastructure/Http/axios.instance";
import { BiErrorCircle } from "react-icons/bi";
import { useAuth } from "../../Module/Auth/useAuth";
import { formatDateWithoutTime } from "../../Module/Utils/dateFormatterWithoutHour";

export const AnalyticsPage = () => {
  const { user } = useAuth();
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalConfirmedReservations, setTotalConfirmedReservations] = useState(0);
  const [totalCanceledReservations, setTotalCanceledReservations] = useState(0);
  const [totalWaitingReservations, setTotalWaitingReservations] = useState(0);

  const tableRankings = [
    { table: 'Table 1', timesBooked: 35 },
    { table: 'Table 2', timesBooked: 30 },
    { table: 'Table 3', timesBooked: 25 },
    { table: 'Table 4', timesBooked: 20 },
  ];

  const popularCapacities = [
    { capacity: '2 personnes', bookings: 50 },
    { capacity: '4 personnes', bookings: 35 },
    { capacity: '6 personnes', bookings: 15 },
  ];

  const peopleCounts = [
    { people: '2 personnes', count: 40 },
    { people: '4 personnes', count: 35 },
    { people: '6 personnes', count: 25 },
  ];

  useEffect(() => {
    document.title = 'Oresto - Statistiques';
    const fetchTotalReservations = async () => {
      try {
        setTotalReservations(100);
        setTotalConfirmedReservations(60);
        setTotalCanceledReservations(25);
        setTotalWaitingReservations(15);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchTotalReservations();
  }, []);

  const isDataAvailable = totalReservations > 0;

  return (
    <div className="bg-light w-full min-h-screen p-8">
      {/* En-tête des statistiques */}
      <div className="pb-6">
        <h1 className="text-2xl font-bold">Statistiques</h1>
        <span className="text-gray-500">
          {isDataAvailable ? "" : "Retrouvez les statistiques de votre restaurant sur cette page"}
        </span>
      </div>

      {isDataAvailable ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistiques des réservations */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Réservations</h2>
            <p className="text-gray-700">
              Total des réservations : <span className="font-semibold">{totalReservations}</span>
            </p>
            <p className="text-gray-700">
              Confirmées : <span className="font-semibold text-green-500">{totalConfirmedReservations}</span>
            </p>
            <p className="text-gray-700">
              En attente : <span className="font-semibold text-yellow-500">{totalWaitingReservations}</span>
            </p>
            <p className="text-gray-700">
              Annulées : <span className="font-semibold text-red-500">{totalCanceledReservations}</span>
            </p>
          </div>

          {/* Classement des tables les plus réservées */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Classement des tables les plus réservées</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Table</th>
                  <th className="px-4 py-2">Nombre de réservations</th>
                </tr>
              </thead>
              <tbody>
                {tableRankings.map((table, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2">{table.table}</td>
                    <td className="border px-4 py-2">{table.timesBooked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Capacités les plus réservées */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Capacités les plus réservées</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Capacité</th>
                  <th className="px-4 py-2">Réservations</th>
                </tr>
              </thead>
              <tbody>
                {popularCapacities.map((capacity, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2">{capacity.capacity}</td>
                    <td className="border px-4 py-2">{capacity.bookings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nombre de personnes par réservation */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Nombre de personnes par réservation</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Nombre de personnes</th>
                  <th className="px-4 py-2">Nombre de réservations</th>
                </tr>
              </thead>
              <tbody>
                {peopleCounts.map((people, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2">{people.people}</td>
                    <td className="border px-4 py-2">{people.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="flex flex-col justify-center items-center text-lg font-bold text-gray-500 gap-2">
            <BiErrorCircle size={80} color="#d8d8d8" />
            Aucune donnée disponible pour le moment
          </p>
          <article className="text-sm pt-1">Les données seront consultables dès qu'une réservation sera faite sur votre restaurant</article>
        </div>
      )}
    </div>
  );
};

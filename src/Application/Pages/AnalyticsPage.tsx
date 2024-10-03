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
    { capacity: '2 couverts', bookings: 50 },
    { capacity: '4 couverts', bookings: 35 },
    { capacity: '6 couverts', bookings: 15 },
    { capacity: '8 couverts', bookings: 7 },
  ];

  const peopleCounts = [
    { people: '2 couverts', count: 40 },
    { people: '4 couverts', count: 35 },
    { people: '6 couverts', count: 25 },
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
    <div className="bg-light w-full min-h-screen pl-10">
      {/* En-tête des statistiques */}
      <div className="pt-10 pb-7">
        <h1 className="text-xl font-bold">Statistiques</h1>
        <h2 className="text-lg mt-1 mb-2">Consultez les statistiques de votre restaurant</h2>
      </div>

      {isDataAvailable ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Statistiques des réservations */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-5">Réservations</h2>
            <ul className="space-y-4">
            <li className="text-gray-700">
              Total des réservations : <span className="font-semibold">{totalReservations}</span>
            </li>
            <li className="text-gray-700">
              Confirmées : <span className="font-semibold text-green-700">{totalConfirmedReservations}</span>
            </li>
            <li className="text-gray-700">
              En attente : <span className="font-semibold text-orange-500">{totalWaitingReservations}</span>
            </li>
            <li className="text-gray-700">
              Annulées : <span className="font-semibold text-red-500">{totalCanceledReservations}</span>
            </li>
            </ul>
          </div>

          {/* Classement des tables les plus réservées */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Tables les + réservées</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Tables</th>
                  <th className="px-4 py-2">Réservations</th>
                </tr>
              </thead>
              <tbody>
                {tableRankings.map((table, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2">{table.table}</td>
                    <td className="border px-4 py-2 text-center">{table.timesBooked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Capacités les plus réservées */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Capacités les + réservées</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Couverts</th>
                  <th className="px-4 py-2">Réservations</th>
                </tr>
              </thead>
              <tbody>
                {popularCapacities.map((capacity, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2">{capacity.capacity}</td>
                    <td className="border px-4 py-2 text-center">{capacity.bookings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nombre de personnes par réservation */}
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Réservations par personnes</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Personnes</th>
                  <th className="px-4 py-2">Réservations</th>
                </tr>
              </thead>
              <tbody>
                {peopleCounts.map((people, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border px-4 py-2">{people.people}</td>
                    <td className="border px-4 py-2 text-center">{people.count}</td>
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

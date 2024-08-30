import { useEffect, useState } from 'react';
import { TableArea } from '../Components/Dashboard/TablePlan/TableArea';
import { TableForm } from '../Components/Dashboard/TablePlan/TableForm';
import { dateService } from '../../Module/Utils/dateService';
import { useAuth } from '../../Module/Auth/useAuth';

export const TablePlanPage = () => {
  const { token, company } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Initialiser avec la date actuelle

  useEffect(() => {
    console.log("Token in TablePlanPage:", token);
    console.log("Company in TablePlanPage:", company);

    if (!token || !company) {
      console.error('Token ou Company ID manquant');
      return;
    }

    // Abonnement pour mettre à jour la date
    const subscription = dateService.getDate().subscribe((date) => {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      console.log('Received date from dateService:', date);
      console.log('Local date after timezone adjustment:', localDate);
      setSelectedDate(localDate); // Mettre à jour selectedDate
    });

    return () => {
      console.log('Unsubscribing from dateService');
      subscription.unsubscribe(); // Nettoyer l'abonnement
    };
  }, [token, company]);

  // Log the current state before rendering
  console.log('Selected Date:', selectedDate);
  console.log('Company:', company);
  console.log('Token:', token);

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-8 pl-12">Plan de table</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">0</span> table enregistrée
        | <span className="font-bold text-red-500 dark:text-white">0</span> couvert
      </h2>
      <TableForm />
      {selectedDate && company && token ? (
        <TableArea selectedDate={selectedDate} company={company} token={token} />
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { TableArea } from '../Components/Dashboard/TablePlan/TableArea';
import { TableForm } from '../Components/Dashboard/TablePlan/TableForm';
import { dateService } from '../../Module/Utils/dateService';
import { useAuth } from '../../Module/Auth/useAuth';

export const TablePlanPage = () => {
  const { token, company } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Token in TablePlanPage:", token);
    console.log("Company in TablePlanPage:", company);

    if (!token || !company) {
      console.error('Token ou Company ID manquant');
      return;
    }

    const subscription = dateService.getDate().subscribe((date) => {
      setSelectedDate(new Date(date.getTime() - date.getTimezoneOffset() * 60000)); // Ajuste la date pour le fuseau horaire local
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [token, company]);

  return (
    <div className="bg-light w-full">
      <h1 className="text-xl font-bold pt-8 pl-12">Plan de table</h1>
      <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500 dark:text-white">0</span> table enregistrée
        | <span className="font-bold text-red-500 dark:text-white">0</span> couvert
      </h2>
      <TableForm />
      <TableArea selectedDate={selectedDate} company={company} token={token} />
    </div>
  );
};

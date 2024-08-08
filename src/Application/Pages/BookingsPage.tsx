import { useEffect, useState } from 'react';
import { BookingList } from '../Components/Dashboard/BookingList';
import { TableArea } from '../Components/Dashboard/TableLayout/TableArea';
import { formatDateWithoutTime } from '../../Module/Utils/dateFormatterWithoutHour';
import { dateService } from '../../Module/Utils/dateService'; // Importez le service}

export const BookingsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const subscription = dateService.getDate().subscribe(date => {
      setSelectedDate(date);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="bg-light w-full mb-4">
        <h1 className="text-xl font-bold pt-8 pl-12">
          {selectedDate ? formatDateWithoutTime(selectedDate.toISOString()) : 'Sélectionnez une date'}
        </h1>
        <h2 className="text-lg pl-12 mt-1">
            <span className="font-bold text-red-500 dark:text-white">0</span> réservation 
            | <span className="font-bold text-red-500 dark:text-white">0</span> couvert
        </h2>
        <BookingList />
        <TableArea />
    </div>
  );
};

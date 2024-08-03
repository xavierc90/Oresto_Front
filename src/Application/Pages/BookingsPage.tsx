import { BookingList } from '../Components/Dashboard/BookingList';
import { TableArea } from '../Components/Dashboard/TableLayout/TableArea';

export const BookingsPage = () => {

  return (
    <div className="bg-light w-full mb-4">
        <h1 className="text-xl font-bold pt-8 pl-12">Vendredi 26 juillet 2024</h1>
        <h2 className="text-lg pl-12 mt-1">
            <span className="font-bold text-red-500">1</span> réservation 
            | <span className="font-bold text-red-500">4</span> couverts
        </h2>
        <BookingList />
        <TableArea />
    </div>
  );
};

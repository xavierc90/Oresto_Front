import { DashboardNav } from '../Components/Dashboard/DashboardNav'
import { BookingList } from '../Components/Dashboard/BookingList'
import { useEffect } from 'react';
import { ManagerLine } from '../Components/Dashboard/ManagerLine'

export const DashboardPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Gestion des réservations';
  }, []);

  return (
    <div className='flex'>
    <DashboardNav />
    <BookingList />
    <ManagerLine />
    </div>
  )
}

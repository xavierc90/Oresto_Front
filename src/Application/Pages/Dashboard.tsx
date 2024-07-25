import { DashboardNav } from '../Components/DashboardNav'
import { BookingList } from '../Components/BookingList'
import { useEffect } from 'react';
import { ManagerLine } from '../Components/ManagerLine'

export const Dashboard = () => {
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

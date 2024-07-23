import { DashboardNav } from '../Components/DashboardNav'
import { useEffect } from 'react';

export const Dashboard = () => {
  useEffect(() => {
    document.title = 'Oresto - Gestion des réservations';
  }, []);

  return (
    <DashboardNav />
  )
}

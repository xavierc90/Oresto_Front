import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';

export const DashboardPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Gestion des réservations';
  }, []);

  return (
    <div className='flex'>
      <DashboardNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

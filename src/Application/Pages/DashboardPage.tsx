import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';

export const DashboardPage = () => {
  useEffect(() => {
    document.title = 'Oresto - Gestion des réservations';
  }, []);

  return (
    <div className='flex'>
      <div className='absolute right-12 top-6 mr-10 text-base'>John Doe</div>
      <DashboardNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
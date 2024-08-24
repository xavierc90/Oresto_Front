import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { IoIosNotifications, IoIosArrowDown } from "react-icons/io";
import { useAuth } from '../../Module/Auth/useAuth';

export const DashboardPage = () => {
  const { user: authUser, company: authCompany, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(authUser);
  const [company, setCompany] = useState(authCompany);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Token récupéré dans DashboardPage:', storedToken);

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('Token manquant. Redirection vers la page de connexion...');
      logout();
      navigate('/login');
      return;
    }

    if (!authUser || !authUser._id) {
      console.warn('Utilisateur non authentifié. Redirection vers la page de connexion...');
      logout();
      navigate('/login');
      return;
    }

    if (!authCompany || !authCompany._id) {
      console.warn('Aucune société associée à cet utilisateur.');
    } else {
      setUser(authUser);
      setCompany(authCompany);
    }
  }, [authUser, authCompany, navigate, logout]);

  if (!user || !company || !token) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex dark:bg-dark-800 dark:text-white h-full">
      <DashboardNav company={company} />
      <div className="flex-1">
        <Outlet context={{ user, company, token }} />
      </div>
      <div className="flex absolute right-12 mr-4 top-10 gap-2">
        <IoIosNotifications size={25} />
        <div className="flex gap-3 justify-center items-center">
          <h2>{`${user.firstname} ${user.lastname}`}</h2>
          <IoIosArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};

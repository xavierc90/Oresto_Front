import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { IoIosNotifications, IoIosArrowDown } from "react-icons/io";
import { http } from '../../Infrastructure/Http/axios.instance';
import { Company } from '../../Module/Auth/company.type';
import { User } from '../../Module/Auth/user.type';
import { useAuth } from '../../Module/Auth/useAuth';

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || !authUser.user_id) {
      logout();
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      try {
        const userResponse = await http.get(`find_user/${authUser.user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.data) {
          setUser(userResponse.data);
          if (userResponse.data.company && userResponse.data.company.length > 0) {
            setCompany(userResponse.data.company[0]);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        logout();
        navigate('/login');
      }
    };

    fetchData();
  }, [authUser, navigate, logout]);

  if (!user || !company) {
    return <div>Chargement...</div>; // Montre un écran de chargement pendant la récupération des données
  }

  return (
    <div className='flex dark:bg-dark-800 dark:text-white'>
      <DashboardNav company={company} />
      <div className='w-9/12'>
        <Outlet context={{ user, company }} />
      </div>
      <div className="flex absolute right-12 mr-4 top-10 gap-2">
        <IoIosNotifications size={25} />
        <div className="flex gap-3 justify-center items-center">
          <h2>{user ? `${user.firstname} ${user.lastname}` : 'Chargement...'}</h2>
          <IoIosArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { IoIosNotifications, IoIosArrowDown } from "react-icons/io";
import { http } from '../../Infrastructure/Http/axios.instance';
import { Company } from '../../Module/Types/company.type';
import { User } from '../../Module/Types/user.type';
import { useAuth } from '../../Module/Auth/auth.hook';

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const { isAuthenticated, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userResponse = await http.get(`find_user/${userId}`, {
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
        navigate('/login');
      }
    };

    fetchData();
  }, [isAuthenticated, userId, navigate]);

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

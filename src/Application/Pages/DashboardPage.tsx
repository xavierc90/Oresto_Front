import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { IoIosNotifications, IoIosArrowDown } from 'react-icons/io';
import { http } from '../../Infrastructure/Http/axios.instance';
import { Company } from '../../Module/Types/company.type';
import { useAuth } from '../../Module/Auth/useAuth';

export const DashboardPage = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const { user, token } = useAuth(); // Récupère le user et le token depuis useAuth
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      console.log("User or token missing, redirecting to login.");
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await http.get(`/find_user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.data && userResponse.data.company) {
          setCompany(userResponse.data.company[0]); // Assure que la première company est sélectionnée
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        navigate('/login'); // Redirige vers la page de login en cas d'erreur
      }
    };

    fetchData();
  }, [user, token, navigate]);

  return (
    <div className='flex dark:bg-dark-800 dark:text-white'>
      <DashboardNav company={company} />
      <div className='w-9/12'>
        <Outlet context={{ user, company, token }} />
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

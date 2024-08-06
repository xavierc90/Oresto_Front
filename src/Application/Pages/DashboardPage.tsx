import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {DashboardNav} from '../Components/Dashboard/DashboardNav';
import { IoIosNotifications, IoIosArrowDown } from "react-icons/io";
import { http } from '../../Infrastructure/Http/axios.instance';
import { Company } from '../../Module/Types/company.type';
import { User } from '../../Module/Types/user.type';

export const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      console.error('Token ou User ID manquant');
      return;
    }

    async function fetchData() {
      try {
        const userResponse = await http.get(`find_user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.data) {
          setUser(userResponse.data);
          // Vérifiez si la compagnie est incluse dans la réponse utilisateur
          if (userResponse.data.company && userResponse.data.company.length > 0) {
            setCompany(userResponse.data.company[0]); // Prendre la première compagnie de la liste
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='flex'>
      <DashboardNav company={company} />
      <div className='w-9/12'>
        <Outlet />
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

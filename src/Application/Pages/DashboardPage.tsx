import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { IoIosNotifications } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { http } from '../../Infrastructure/Http/axios.instance'; // Assurez-vous que le chemin est correct
import { User } from '../../Module/Types/user.type'

export const DashboardPage = () => {
  const [user, setUser] =  useState<User | null>(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get('/find_user/66acfb516a708a694873e851');
        if (response.data) {
          setUser(response.data);
        } else {
          console.error('Données utilisateur manquantes:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='flex'>
      <DashboardNav />
      <div className='w-9/12'>
        <Outlet />
      </div>
      <div className="flex absolute right-12 mr-4 top-4 gap-2">
        <IoIosNotifications size={25} />
        <div className="flex gap-3 justify-center items-center">
          <h2>{user ? `${user.firstname} ${user.lastname}` : 'Chargement...'}</h2>
          <IoIosArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};

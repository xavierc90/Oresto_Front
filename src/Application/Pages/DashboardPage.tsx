import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { http } from '../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../Module/Auth/useAuth';

export const DashboardPage = () => {
  const { user, restaurant, token } = useAuth();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);

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
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [user, token, restaurant, navigate]);

  return (
    <div className="flex dark:bg-dark-800 dark:text-white h-screen">
      {/* Passer le setter de l'état pour gérer l'ouverture du menu */}
      <DashboardNav restaurant={restaurant} setIsNavOpen={setIsNavOpen} />
      <div
        className={`transition-all duration-300 h-full w-full ${
          isNavOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        {/* Ce div prend toute la largeur disponible */}
        <div className="w-full h-full">
          <Outlet context={{ user, restaurant, token }} />
        </div>
      </div>
    </div>
  );
};

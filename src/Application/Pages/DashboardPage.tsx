import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardNav } from '../Components/Dashboard/DashboardNav';
import { http } from '../../Infrastructure/Http/axios.instance';
import { useAuth } from '../../Module/Auth/useAuth';
import { CookieBanner } from '../Components/CookieBanner';

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
        // Gérer la réponse si nécessaire
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        navigate('/login');
      }
    };

    fetchData();
  }, [user, token, restaurant, navigate]);

  return (
    <div className="flex h-screen dark:bg-gray-900 dark:text-white">
      <DashboardNav restaurant={restaurant} setIsNavOpen={setIsNavOpen} />

      <div
        className={`transition-all duration-300 h-full w-full ${
          isNavOpen ? 'ml-72' : 'ml-16'
        }`}
      >
        <div className="w-full h-full relative">
          <Outlet context={{ user, restaurant, token }} />
        </div>
      </div>
      <CookieBanner />
    </div>
  );
};

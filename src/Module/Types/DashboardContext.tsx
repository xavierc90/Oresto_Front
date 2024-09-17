import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { http } from '../../Infrastructure/Http/axios.instance';

// Types pour le contexte
interface DashboardContextType {
  user: any; // Remplace 'any' par un type spécifique pour 'user' si disponible
  restaurant: any; // Remplace 'any' par un type spécifique pour 'restaurant' si disponible
}

// Création du contexte avec une valeur par défaut
export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Provider du contexte
interface DashboardProviderProps {
  children: ReactNode; // Définition explicite du type pour 'children'
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Remplace 'any' par un type spécifique si disponible
  const [restaurant, setRestaurant] = useState<any>(null); // Remplace 'any' par un type spécifique si disponible

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        console.error('Token ou User ID manquant');
        return;
      }

      try {
        const userResponse = await http.get(`find_user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (userResponse.data) {
          setUser(userResponse.data);

          const restaurantResponse = await http.get(`find_restaurant/${userResponse.data.restaurantId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (restaurantResponse.data) {
            setRestaurant(restaurantResponse.data);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DashboardContext.Provider value={{ user, restaurant }}>
      {children}
    </DashboardContext.Provider>
  );
};

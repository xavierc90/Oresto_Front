// src/context/DashboardContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../Module/Auth/useAuth';
import { http } from '../Infrastructure/Http/axios.instance';

// Types
import { User } from './Auth/user.type';
import { Restaurant } from './Types/restaurant.type';
import { Table } from '../Module/Types/table.type'; // Assurez-vous que ce type est défini

interface DashboardContextType {
  user: User | null;
  restaurant: Restaurant | null;
  tables: Table[] | null; // Type Table doit être défini dans vos types
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Fournisseur de contexte
export const DashboardProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [tables, setTables] = useState<Table[] | null>(null);
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const userResponse = await http.get<User>(`/find_user/${userId}`, { headers });
        setUser(userResponse.data);

        if (userResponse.data && userResponse.data.restaurant_id) {
          const restaurantResponse = await http.get<Restaurant>(`/find_user/${userResponse.data.restaurant_id}`, { headers });
          setRestaurant(restaurantResponse.data);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isAuthenticated, userId]);

  return (
    <DashboardContext.Provider value={{ user, restaurant, tables }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export default DashboardContext;

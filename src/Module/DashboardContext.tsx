// src/context/DashboardContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../Module/Auth/auth.hook';
import { http } from '../Infrastructure/Http/axios.instance';

// Types
import { User } from '../Module/Types/user.type';
import { Company } from '../Module/Types/company.type';
import { Table } from '../Module/Types/table.type'; // Assurez-vous que ce type est défini

interface DashboardContextType {
  user: User | null;
  company: Company | null;
  tables: Table[] | null; // Type Table doit être défini dans vos types
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Fournisseur de contexte
export const DashboardProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
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

        if (userResponse.data && userResponse.data.company_id) {
          const companyResponse = await http.get<Company>(`/find_user/${userResponse.data.company_id}`, { headers });
          setCompany(companyResponse.data);

          const tablesResponse = await http.get<Table[]>(`/find_tables/${companyResponse.data.table_id}`, { headers });
          setTables(tablesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isAuthenticated, userId]);

  return (
    <DashboardContext.Provider value={{ user, company, tables }}>
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

import { createContext, useState, useContext, useEffect } from 'react';
import { http } from '../../Infrastructure/Http/axios.instance';

// Création du contexte
export const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

// Provider du contexte
export const DashboardProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);

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

                    const companyResponse = await http.get(`find_company/${userResponse.data.companyId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (companyResponse.data) {
                        setCompany(companyResponse.data);
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <DashboardContext.Provider value={{ user, company }}>
            {children}
        </DashboardContext.Provider>
    );
};

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../Module/Types/user.type';
import { Company } from '../../Module/Types/company.type';
import { http } from '../../Infrastructure/Http/axios.instance';

// Définition du type pour le token décodé
interface DecodedToken {
  userId: string;
  exp: number;
}

type AuthContextType = {
  isAuthenticated: boolean;
  userId: string | null;
  user: User | null;
  company: Company | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);  // Utilisation de l'interface
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserId(decodedToken.userId);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('companyId');
          localStorage.removeItem('darkMode');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('companyId');
      }
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && userId) {
        const token = localStorage.getItem('token');
        try {
          const userResponse = await http.get(`find_user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (userResponse.data) {
            setUser(userResponse.data);
            if (userResponse.data.company && userResponse.data.company.length > 0) {
              const firstCompany = userResponse.data.company[0];
              setCompany(firstCompany);

              // Stocker le company_id dans le localStorage
              localStorage.setItem('companyId', firstCompany._id);

              // Ajouter un console.log pour afficher le companyId
              console.log('Company ID:', firstCompany._id);
            }
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          logout();
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, userId]);

  const login = (token: string, userId: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserId(userId);

    // Ajout du console.log après l'authentification
    const companyId = localStorage.getItem('companyId');
    if (companyId) {
      console.log('User logged in. Company ID:', companyId);
    }
  };

  const logout = () => {
    console.log('Déconnexion en cours...');
    console.log('Suppression des données de localStorage:', {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      companyId: localStorage.getItem('companyId'),
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');
    localStorage.removeItem('darkMode');
    setIsAuthenticated(false);
    setUserId(null);
    setUser(null);
    setCompany(null);
    console.log('Utilisateur déconnecté. Les données ont été réinitialisées.');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, user, company, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

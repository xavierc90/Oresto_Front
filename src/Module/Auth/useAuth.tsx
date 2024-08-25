import { useEffect, useState } from 'react';
import { authService } from './authService';
import { Company } from '../Types/company.type';
import { User } from './user.type';

export const useAuth = () => {
  // Initialisation des états à partir du localStorage ou des valeurs par défaut du service d'authentification
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : authService.currentUser;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [company, setCompany] = useState<Company | null>(() => {
    try {
      const storedCompany = localStorage.getItem('company');
      return storedCompany ? JSON.parse(storedCompany) : authService.currentCompany;
    } catch (error) {
      console.error("Failed to parse company from localStorage", error);
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || authService.currentToken;
  });

  // Abonnement aux changements de l'utilisateur, de la société et du token
  useEffect(() => {
    const userSubscription = authService.user$.subscribe((newUser) => {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    });

    const companySubscription = authService.company$.subscribe((newCompany) => {
      setCompany(newCompany);
      localStorage.setItem('company', JSON.stringify(newCompany));
    });

    const tokenSubscription = authService.token$.subscribe((newToken) => {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token');
      }
    });

    return () => {
      userSubscription.unsubscribe();
      companySubscription.unsubscribe();
      tokenSubscription.unsubscribe();
    };
  }, []);

  // Gestion de la connexion
  const login = (user: User, company: Company, token: string) => {
    authService.login(user, company, token);
    setUser(user);
    setCompany(company);
    setToken(token);
  };

  // Gestion de la déconnexion
  const logout = () => {
    authService.logout();
    setUser(null);
    setCompany(null);
    setToken(null);
  };

  return { user, company, token, login, logout };
};

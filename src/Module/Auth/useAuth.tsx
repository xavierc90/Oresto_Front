import { useEffect, useState } from 'react';
import { authService } from './authService';
import { Company } from '../Types/company.type';
import { User } from './user.type';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialisation du user à partir du service ou du localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : authService.currentUser;
  });
  const [company, setCompany] = useState<Company | null>(() => {
    // Initialisation de la company à partir du service ou du localStorage
    const storedCompany = localStorage.getItem('company');
    return storedCompany ? JSON.parse(storedCompany) : authService.currentCompany;
  });

  useEffect(() => {
    const userSubscription = authService.user$.subscribe((newUser) => {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    });

    const companySubscription = authService.company$.subscribe((newCompany) => {
      setCompany(newCompany);
      localStorage.setItem('company', JSON.stringify(newCompany));
    });

    return () => {
      userSubscription.unsubscribe();
      companySubscription.unsubscribe();
    };
  }, []);

  const login = (user: User, company: Company) => {
    authService.login(user, company);
    setUser(user);
    setCompany(company);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('company', JSON.stringify(company));
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setCompany(null);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('token');
  };

  return { user, company, login, logout };
};

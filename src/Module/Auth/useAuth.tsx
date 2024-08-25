import { useEffect, useState } from 'react';
import { authService } from './authService';
import { Company } from '../Types/company.type';
import { User } from './user.type';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => authService.currentUser);
  const [company, setCompany] = useState<Company | null>(() => authService.currentCompany);
  const [token, setToken] = useState<string | null>(() => authService.currentToken);

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

  const login = (user: User, company: Company, token: string) => {
    authService.login(user, company, token);
    setUser(user);
    setCompany(company);
    setToken(token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setCompany(null);
    setToken(null);
  };

  return { user, company, token, login, logout };
};

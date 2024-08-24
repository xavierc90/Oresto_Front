import { useEffect, useState } from 'react';
import { authService } from './authService';
import { Company } from '../Types/company.type';
import { User } from './user.type';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.currentUser);
  const [company, setCompany] = useState<Company | null>(authService.currentCompany);

  useEffect(() => {
    const userSubscription = authService.user$.subscribe(setUser);
    const companySubscription = authService.company$.subscribe(setCompany);

    return () => {
      userSubscription.unsubscribe();
      companySubscription.unsubscribe();
    };
  }, []);

  const login = (user: User, company: Company) => {
    authService.login(user, company);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setCompany(null);
  };

  return { user, company, login, logout };
};

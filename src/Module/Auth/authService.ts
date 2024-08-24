import { BehaviorSubject } from 'rxjs';
import { User } from './user.type';
import { Company } from './company.type';

class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private companySubject = new BehaviorSubject<Company | null>(null);

  public user$ = this.userSubject.asObservable();
  public company$ = this.companySubject.asObservable();

  login(user: User, company: Company) {
    this.userSubject.next(user);
    this.companySubject.next(company);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('company', JSON.stringify(company));
  }

  logout() {
    this.userSubject.next(null);
    this.companySubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('token');
  }

  get currentUser(): User | null {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  }

  get currentCompany(): Company | null {
    const company = localStorage.getItem('company');
    try {
      return company ? JSON.parse(company) : null;
    } catch (error) {
      console.error("Failed to parse company from localStorage", error);
      return null;
    }
  }
}

export const authService = new AuthService();

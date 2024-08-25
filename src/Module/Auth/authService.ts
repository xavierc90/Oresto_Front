import { BehaviorSubject } from 'rxjs';
import { User } from './user.type';
import { Company } from '../Types/company.type';

class AuthService {
  private userSubject = new BehaviorSubject<User | null>(this.loadFromLocalStorage('user'));
  private companySubject = new BehaviorSubject<Company | null>(this.loadFromLocalStorage('company'));
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  public user$ = this.userSubject.asObservable();
  public company$ = this.companySubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  private loadFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error(`Failed to parse ${key} from localStorage`, error);
        return null;
      }
    }
    return null;
  }

  login(user: User, company: Company, token: string) {
    this.userSubject.next(user);
    this.companySubject.next(company);
    this.tokenSubject.next(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('company', JSON.stringify(company));
    localStorage.setItem('token', token);
  }

  logout() {
    this.userSubject.next(null);
    this.companySubject.next(null);
    this.tokenSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    localStorage.removeItem('token');
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get currentCompany(): Company | null {
    return this.companySubject.value;
  }

  get currentToken(): string | null {
    return this.tokenSubject.value;
  }

  async refreshUser(token: string): Promise<void> {
    try {
      const response = await fetch(`/find_user/${this.currentUser?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        this.userSubject.next(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        console.error('Failed to refresh user data');
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  }
}

export const authService = new AuthService();

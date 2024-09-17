// authService.ts

import { BehaviorSubject } from 'rxjs';
import { User } from '../Auth/user.type';
import { Restaurant } from '../Types/restaurant.type';

class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private restaurantSubject = new BehaviorSubject<Restaurant | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  user$ = this.userSubject.asObservable();
  restaurant$ = this.restaurantSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  get currentUser(): User | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  get currentRestaurant(): Restaurant | null {
    return JSON.parse(localStorage.getItem('restaurant') || 'null');
  }

  get currentToken(): string | null {
    return localStorage.getItem('token');
  }

  login(user: User, restaurant: Restaurant, token: string) {
    this.userSubject.next(user);
    this.restaurantSubject.next(restaurant);
    this.tokenSubject.next(token);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('restaurant', JSON.stringify(restaurant));
    localStorage.setItem('token', token);
  }

  logout() {
    this.userSubject.next(null);
    this.restaurantSubject.next(null);
    this.tokenSubject.next(null);

    localStorage.removeItem('user');
    localStorage.removeItem('restaurant');
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();

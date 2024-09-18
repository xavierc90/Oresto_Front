import { BehaviorSubject } from 'rxjs';
import { User } from '../Auth/user.type';
import { Restaurant } from '../Types/restaurant.type';

class AuthService {
  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  private restaurantSubject = new BehaviorSubject<Restaurant | null>(this.getStoredRestaurant());
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());

  user$ = this.userSubject.asObservable();
  restaurant$ = this.restaurantSubject.asObservable();
  token$ = this.tokenSubject.asObservable();

  // Utilisation de méthodes pour éviter les erreurs lors de la récupération des données
  private getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erreur lors du parsing des données utilisateur :', error);
      return null;
    }
  }

  private getStoredRestaurant(): Restaurant | null {
    try {
      const restaurantData = localStorage.getItem('restaurant');
      return restaurantData ? JSON.parse(restaurantData) : null;
    } catch (error) {
      console.error('Erreur lors du parsing des données du restaurant :', error);
      return null;
    }
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('token');
  }

  // Accesseurs pour obtenir les données actuelles
  get currentUser(): User | null {
    return this.userSubject.getValue();
  }

  get currentRestaurant(): Restaurant | null {
    return this.restaurantSubject.getValue();
  }

  get currentToken(): string | null {
    return this.tokenSubject.getValue();
  }

  // Méthode pour se connecter
  login(user: User, restaurant: Restaurant, token: string) {
    this.userSubject.next(user);
    this.restaurantSubject.next(restaurant);
    this.tokenSubject.next(token);

    try {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('restaurant', JSON.stringify(restaurant));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données dans le localStorage :', error);
    }
  }

  // Méthode pour se déconnecter
  logout() {
    this.userSubject.next(null);
    this.restaurantSubject.next(null);
    this.tokenSubject.next(null);

    try {
      localStorage.removeItem('user');
      localStorage.removeItem('restaurant');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Erreur lors de la suppression des données du localStorage :', error);
    }
  }
}

export const authService = new AuthService();

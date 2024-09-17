import { useEffect, useState } from 'react';
import { authService } from './authService';
import { Restaurant } from '../Types/restaurant.type';
import { User } from './user.type';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => authService.currentUser);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(() => {
    const storedRestaurant = authService.currentRestaurant;
    // Vérification si currentRestaurant est un tableau par erreur, on prend le premier élément si c'est le cas.
    return Array.isArray(storedRestaurant) ? storedRestaurant[0] : storedRestaurant;
  });
  const [token, setToken] = useState<string | null>(() => authService.currentToken);

  useEffect(() => {
    const userSubscription = authService.user$.subscribe((newUser) => {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    });

    const restaurantSubscription = authService.restaurant$.subscribe((newRestaurant) => {
      // Vérification si la donnée est un tableau, on prend le premier élément si c'est le cas.
      const restaurantData = Array.isArray(newRestaurant) ? newRestaurant[0] : newRestaurant;
      setRestaurant(restaurantData);
      localStorage.setItem('restaurant', JSON.stringify(restaurantData));
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
      restaurantSubscription.unsubscribe();
      tokenSubscription.unsubscribe();
    };
  }, []);

  const login = (user: User, restaurant: Restaurant, token: string) => {
    authService.login(user, restaurant, token);
    setUser(user);
    setRestaurant(restaurant);
    setToken(token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setRestaurant(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(user && token);
  const userId = user ? user._id : null;

  return { 
    user, 
    restaurant, 
    token, 
    login, 
    logout, 
    isAuthenticated, 
    userId 
  };
};

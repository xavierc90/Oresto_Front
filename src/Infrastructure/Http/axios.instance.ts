import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3001', // Assurez-vous que cela correspond à l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un interceptor pour inclure le token dans les requêtes
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
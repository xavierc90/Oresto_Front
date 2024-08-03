import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000
})

// Ajoutez un intercepteur pour les requêtes afin d'ajouter le jeton d'authentification
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
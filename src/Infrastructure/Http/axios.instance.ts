import axios from 'axios';

// Définir le hostname comme variable
// const hostname = '192.168.147.152';
// const hostname = '192.168.0.23';
const hostname = 'localhost';

// Créer l'instance Axios
export const http = axios.create({
  baseURL: `http://${hostname}:3001`, // Utiliser la variable hostname dans baseURL
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
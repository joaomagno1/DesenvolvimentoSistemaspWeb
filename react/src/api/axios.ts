import axios from 'axios';

// Defina a URL base da sua API aqui
// Ex: 'http://localhost:3000/api'
const API_URL = 'http://localhost:8000/rest/sistema';// <-- MUDE ISSO

export const api = axios.create({
  baseURL: API_URL,
});

// BÔNUS: Isso "intercepta" todas as requisições e anexa o token
// se ele existir. Você vai precisar disso para suas rotas de API protegidas.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
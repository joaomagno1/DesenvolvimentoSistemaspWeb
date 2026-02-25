import type { LoginRequest, LoginResponse } from '../types/auth';
import { api } from './axios';
import { type AxiosResponse } from 'axios';

// Note que mudamos de `loginRequest` para `AuthAPI`
// Isso segue o código que corrigimos antes.
export const AuthAPI = {
  login: (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
    // A 'api' vem do seu arquivo axios.ts
    // O Axios coloca a resposta da API dentro de um campo 'data'
    return api.post<LoginResponse>('/auth/login', data);
  },

  // Você pode adicionar outras chamadas de auth aqui
  // ex: verificarToken, registrar, etc.
};
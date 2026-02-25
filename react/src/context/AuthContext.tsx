import { createContext } from 'react';
import type { LoginRequest, Usuario } from '../types/auth';

// A interface que define o formato do contexto
export interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

// A criação e exportação do contexto
export const AuthContext = createContext<AuthContextType>({
  usuario: null,
  token: null,
  login: async () => {},
  logout: () => {},
});
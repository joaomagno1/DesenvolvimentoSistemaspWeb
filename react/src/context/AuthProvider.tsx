import { useState, type ReactNode } from "react"; // <--- Corrigido
import type { LoginRequest, LoginResponse, Usuario } from "../types/auth";
import { AuthAPI } from "../api/auth.api";
import { AuthContext } from "./AuthContext";

// Esta função ajuda a carregar o token
function getInitialToken(): string | null {
  return localStorage.getItem("token");
}

// Esta função ajuda a carregar o usuário
function getInitialUser(): Usuario | null {
  const savedUser = localStorage.getItem("usuario");
  if (savedUser) {
    try {
      return JSON.parse(savedUser) as Usuario;
    } catch (e) {
      console.error("Falha ao carregar dados do usuário", e);
      return null;
    }
  }
  return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Usamos a FUNÇÃO para inicializar o estado
  // O React só vai rodar getInitialUser() na primeira vez
  const [usuario, setUsuario] = useState<Usuario | null>(getInitialUser);

  // 2. Usamos a FUNÇÃO para inicializar o estado
  // O React só vai rodar getInitialToken() na primeira vez
  const [token, setToken] = useState<string | null>(getInitialToken);

  // 3. O useEffect foi REMOVIDO!
  // Não precisamos mais dele para carregar o estado inicial.

  const login = async (data: LoginRequest) => {
    try {
      const response = await AuthAPI.login(data);
      const { token, usuario }: LoginResponse = response.data;

      setToken(token);
      setUsuario(usuario);

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
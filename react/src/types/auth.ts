// Este arquivo define os "formatos" dos dados

// Dados do usuário que recebemos da API
export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
}

// O que precisamos enviar para a API para fazer login
export interface LoginRequest {
  email: string;
  senha: string;
}

// O que a API nos devolve após o login
export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
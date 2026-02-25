// Em: src/types/usuario.ts

// ADICIONE ISTO:
// Um tipo genérico para o "envelope" da sua API
export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  path: string;
  mensagem: string;
  dados: T; // <-- Nossos dados estão aqui
}

// --- Seus tipos de Usuário ---
export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  tipo: string;
}

export interface CreateUsuarioDTO {
  nome: string;
  email: string;
  senha: string; 
  telefone: string;
  endereco: string;
  tipo: string;
}

export interface UpdateUsuarioDTO {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  tipo: string;
}
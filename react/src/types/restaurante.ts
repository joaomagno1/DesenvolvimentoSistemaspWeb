import type { Usuario } from './usuario'; // Garante que o tipo Usuario esteja importado

// ADICIONE ISTO:
// Um tipo genérico para o "envelope" da sua API
export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  path: string;
  mensagem: string;
  dados: T; // <-- A chave que o TypeScript precisa saber que existe
}

// O formato do objeto 'Restaurante' que recebemos da API
// (Baseado na sua Entity)
export interface Restaurante {
  idRestaurante: number;
  nome: string;
  horario_func: string;
  cnpj: string;
  telefone: string;
  endereco: string;
  
  // A API vai retornar o objeto usuário aninhado
  usuario: Usuario; 
}

// O formato dos dados para CRIAR ou ATUALIZAR um Restaurante (DTO)
export interface RestauranteDTO {
  nome: string;
  horario_func: string;
  cnpj: string;
  telefone: string;
  endereco: string;
  
  // Para a relação @ManyToOne, enviamos apenas o ID do usuário
  idUsuario: number; 
}
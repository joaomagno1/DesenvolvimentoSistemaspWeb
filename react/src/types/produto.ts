import type { Restaurante } from "./restaurante"; // Importe a tipagem de restaurante se tiver

export interface Produto {
  idProduto?: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  disponibilidade?: number; // Segui a tipagem number da sua classe
  restaurante?: Restaurante; // Para exibir o nome do restaurante na lista
}

export interface ProdutoDTO {
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  disponibilidade?: number;
  idRestaurante: number; // Enviamos apenas o ID para o backend
}

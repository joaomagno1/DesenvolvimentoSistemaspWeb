import type { AxiosResponse } from "axios";
import type { Produto, ProdutoDTO } from "../types/produto";
import { api } from "./axios"; // Usa a mesma configuração do Restaurante
// Importamos o ApiResponse. Se ele estiver em 'types/restaurante', mantemos o import de lá
// ou você pode mover para um arquivo 'types/common.ts' se preferir organizar.
import type { ApiResponse } from "../types/restaurante";

export const ProdutoAPI = {
  // R - Listar Todos
  getAll: (): Promise<AxiosResponse<ApiResponse<Produto[]>>> => {
    return api.get("/produto/listar");
  },

  // R - Buscar Um por ID
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Produto>>> => {
    return api.get(`/produto/buscar/${id}`);
  },

  // C - Create
  create: (data: ProdutoDTO): Promise<AxiosResponse<ApiResponse<Produto>>> => {
    return api.post("/produto/criar", data);
  },

  // U - Update
  update: (
    id: string,
    data: ProdutoDTO
  ): Promise<AxiosResponse<ApiResponse<Produto>>> => {
    return api.put(`/produto/alterar/${id}`, data);
  },

  // D - Delete
  delete: (id: number): Promise<AxiosResponse<ApiResponse<void>>> => {
    return api.delete(`/produto/excluir/${id}`);
  },
};

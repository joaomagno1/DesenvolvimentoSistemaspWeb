import { api } from './axios';
// Importe os tipos, incluindo o novo ApiResponse
import type { Restaurante, RestauranteDTO, ApiResponse } from '../types/restaurante'; 
import { type AxiosResponse } from 'axios'; 

export const RestauranteAPI = {
  // R - Read (Listar Todos)
  // Retorna uma Promise de um "envelope" que contém um array de Restaurantes
  getAll: (): Promise<AxiosResponse<ApiResponse<Restaurante[]>>> => {
    return api.get('/restaurante/listar'); 
  },

  // R - Read (Buscar Um por ID)
  // Retorna uma Promise de um "envelope" que contém um único Restaurante
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Restaurante>>> => {
    return api.get(`/restaurante/buscar/${id}`);
  },

  // C - Create
  create: (data: RestauranteDTO): Promise<AxiosResponse<ApiResponse<Restaurante>>> => {
    return api.post('/restaurante/criar', data); 
  },

  // U - Update
  update: (id: string, data: RestauranteDTO): Promise<AxiosResponse<ApiResponse<Restaurante>>> => {
    return api.put(`/restaurante/alterar/${id}`, data); 
  },

  // D - Delete
  // Retorna uma Promise de um "envelope" que não contém dados
  delete: (id: string): Promise<AxiosResponse<ApiResponse<void>>> => {
    return api.delete(`/restaurante/excluir/${id}`); 
  },
};
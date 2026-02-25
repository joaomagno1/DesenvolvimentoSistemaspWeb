// Em: src/api/usuario.api.ts

import { api } from './axios';
// Importe os tipos (incluindo o ApiResponse que acabamos de adicionar)
import type { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO, ApiResponse } from '../types/usuario';
import { type AxiosResponse } from 'axios';

// ISSO CORRIGE A IMAGEM 1
export const UsuarioAPI = {
  // R - Read (Listar Todos)
  getAll: (): Promise<AxiosResponse<ApiResponse<Usuario[]>>> => {
    return api.get('/usuario/listar');
  },

  // R - Read (Buscar Um por ID)
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Usuario>>> => {
    return api.get(`/usuario/buscar/${id}`);
  },

  // C - Create
  create: (data: CreateUsuarioDTO): Promise<AxiosResponse<ApiResponse<Usuario>>> => {
    return api.post('/usuario/criar', data);
  },

  // U - Update
  update: (id: string, data: UpdateUsuarioDTO): Promise<AxiosResponse<ApiResponse<Usuario>>> => {
    return api.put(`/usuario/alterar/${id}`, data);
  },

  // D - Delete
  delete: (id: string): Promise<AxiosResponse<ApiResponse<void>>> => {
    return api.delete(`/usuario/excluir/${id}`);
  },
};
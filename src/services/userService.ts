import { api } from './api';
import { User } from './authService';

export const userService = {
  getProfile: async (): Promise<User> => {
    return api.get('/users/profile');
  },

  updateProfile: async (data: { nom?: string; telephone?: string; email?: string }) => {
    return api.put('/users/profile', data);
  },

  getUsers: async (): Promise<User[]> => {
    return api.get('/users');
  },

  getUser: async (id: string): Promise<User> => {
    return api.get(`/users/${id}`);
  },

  updateUser: async (id: string, data: Partial<User>) => {
    return api.put(`/users/${id}`, data);
  },

  deleteUser: async (id: string) => {
    return api.delete(`/users/${id}`);
  },
};

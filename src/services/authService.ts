import { api } from './api';

export interface User {
  id: string;
  email: string;
  nom: string;
  telephone?: string;
  role: 'client' | 'admin';
  created_at: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export const authService = {
  register: async (data: { email: string; password: string; nom: string; telephone?: string }) => {
    const response = await api.post('/auth/register', data);
    return response;
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    return response;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout', {});
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  getCurrentUser: async (): Promise<User> => {
    return api.get('/auth/me');
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    localStorage.setItem('access_token', response.access_token);
    return response;
  },
};

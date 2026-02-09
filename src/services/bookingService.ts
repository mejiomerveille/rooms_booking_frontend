import { api } from './api';
import { Room } from './roomService';
import { User } from './authService';

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  nombre_nuits: number;
  montant: number;
  statut: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  mode_paiement: string;
  created_at: string;
  room?: Room;
  user?: User;
}

export const bookingService = {
  getBookings: async (params?: { statut?: string; userId?: string; roomId?: string }) => {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return api.get(`/bookings${query}`) as Promise<Booking[]>;
  },

  getBooking: async (id: string): Promise<Booking> => {
    return api.get(`/bookings/${id}`);
  },

  createBooking: async (data: { room_id: string; check_in: string; check_out: string; mode_paiement: string }) => {
    return api.post('/bookings', data);
  },

  updateBooking: async (id: string, data: Partial<Booking>) => {
    return api.put(`/bookings/${id}`, data);
  },

  cancelBooking: async (id: string) => {
    return api.post(`/bookings/${id}/cancel`, {});
  },

  deleteBooking: async (id: string) => {
    return api.delete(`/bookings/${id}`);
  },
};

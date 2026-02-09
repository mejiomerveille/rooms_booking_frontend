import { api } from './api';

export interface Room {
  id: string;
  numero: string;
  type: string;
  capacite: number;
  prix: number;
  description?: string;
  equipements: string[];
  statut: 'available' | 'occupied' | 'maintenance';
  photos?: RoomPhoto[];
  created_at: string;
}

export interface RoomPhoto {
  id: string;
  room_id: string;
  url: string;
  ordre: number;
}

export const roomService = {
  getRooms: async (
    params?: {
      type?: string;
      statut?: string;
      minPrice?: number;
      maxPrice?: number;
      capacite?: number;
    }
  ): Promise<{ data: Room[] }> => {
    const query = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    // api.get doit renvoyer un objet { data: Room[] }
    return api.get(`/rooms${query}`);
  },
  // ...
// };

getRoom: async (id: string): Promise<Room> => {
  const response = await api.get(`/rooms/${id}`); // backend renvoie { data: Room }
  return response.data as Room;
},


  checkAvailability: async (roomId: string, checkIn: string, checkOut: string): Promise<{ available: boolean }> => {
    return api.get(`/rooms/${roomId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
  },

  createRoom: async (data: Partial<Room>) => {
    return api.post('/rooms', data);
  },

  updateRoom: async (id: string, data: Partial<Room>) => {
    return api.put(`/rooms/${id}`, data);
  },

  deleteRoom: async (id: string) => {
    return api.delete(`/rooms/${id}`);
  },

  addPhoto: async (roomId: string, url: string, ordre: number) => {
    return api.post(`/rooms/${roomId}/photos`, { url, ordre });
  },

  deletePhoto: async (roomId: string, photoId: string) => {
    return api.delete(`/rooms/${roomId}/photos/${photoId}`);
  },
};

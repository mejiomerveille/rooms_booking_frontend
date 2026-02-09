import { Link } from 'react-router-dom';
import { Users, Wifi, Tv } from 'lucide-react';
import { Room } from '../services/roomService';

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  const mainPhoto = room.photos?.[0]?.url || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg';

  return (
    <Link
      to={`/chambres/${room.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={mainPhoto}
          alt={room.type}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <span className="text-blue-600 font-semibold">{room.prix}€/nuit</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{room.type}</h3>
          <span className="text-sm text-gray-500">Chambre {room.numero}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {room.description || 'Chambre confortable et élégante'}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{room.capacite} pers.</span>
          </div>
          {room.equipements.includes('wifi') && (
            <div className="flex items-center space-x-1">
              <Wifi className="h-4 w-4" />
              <span>WiFi</span>
            </div>
          )}
          {room.equipements.includes('tv') && (
            <div className="flex items-center space-x-1">
              <Tv className="h-4 w-4" />
              <span>TV</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Voir les détails
          </button>
        </div>
      </div>
    </Link>
  );
};

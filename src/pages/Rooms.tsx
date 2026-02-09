import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RoomCard } from '../components/RoomCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { roomService, Room } from '../services/roomService';
import { Filter } from 'lucide-react';

export const Rooms = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  const fetchRooms = async () => {
    try {
      const response = await roomService.getRooms({ statut: 'available' });
      console.log('getRooms response:', response);

      // Ton log montre : { data: Array(10) }
      const roomsArray = response.data as Room[];

      setRooms(roomsArray);
      // const roomsArray = response.data as Room[];
      console.log('roomsArray après fetch:', roomsArray.length, roomsArray);

      setRooms(roomsArray);
      setFilteredRooms(roomsArray);

      setFilteredRooms(roomsArray);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // useEffect(() => {
  //   let filtered = [...rooms];

  //   if (selectedType !== 'all') {
  //     filtered = filtered.filter((room) => room.type === selectedType);
  //   }

  //   // prix arrive en string ("25000.00") d’après ton screenshot,
  //   // donc on cast en Number pour les comparaisons
  //   filtered = filtered.filter((room) => {
  //     const prixNumber = Number(room.prix);
  //     return prixNumber >= priceRange.min && prixNumber <= priceRange.max;
  //   });

  //   if (guests) {
  //     filtered = filtered.filter((room) => room.capacite >= Number(guests));
  //   }

  //   setFilteredRooms(filtered);
  // }, [selectedType, priceRange, rooms, guests]);

  useEffect(() => {
  setFilteredRooms(rooms);
}, [rooms]);

  const roomTypes = ['all', ...new Set(rooms.map((room) => room.type))];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Nos Chambres</h1>
          <p className="text-xl">
            Découvrez notre sélection de chambres élégantes et confortables
          </p>
          {checkIn && checkOut && (
            <p className="mt-2 text-blue-100">
              Du {new Date(checkIn).toLocaleDateString('fr-FR')} au{' '}
              {new Date(checkOut).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de chambre
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Tous les types' : type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix minimum: {priceRange.min}€
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum: {priceRange.max}€
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Aucune chambre disponible avec ces critères
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

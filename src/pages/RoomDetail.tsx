import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Users, Wifi, Tv, Coffee, Wind, ArrowLeft } from 'lucide-react';
import { roomService, Room } from '../services/roomService';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      try {
        const data = await roomService.getRoom(id);
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleReservation = () => {
    if (!user) {
      navigate('/login?redirect=' + window.location.pathname);
      return;
    }
    navigate(`/reserver/${id}?checkIn=${checkIn || ''}&checkOut=${checkOut || ''}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Chambre non trouvée</p>
      </div>
    );
  }

  const photos = room.photos?.length
    ? room.photos
    : [{ id: '1', room_id: room.id, url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg', ordre: 1 }];

  const equipmentIcons: Record<string, JSX.Element> = {
    wifi: <Wifi className="h-5 w-5" />,
    tv: <Tv className="h-5 w-5" />,
    minibar: <Coffee className="h-5 w-5" />,
    climatisation: <Wind className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8">
              <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
                <img
                  src={photos[currentPhotoIndex].url}
                  alt={room.type}
                  className="w-full h-full object-cover"
                />
              </div>

              {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-20 rounded-lg overflow-hidden ${
                        index === currentPhotoIndex ? 'ring-2 ring-blue-600' : ''
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{room.type}</h1>
                  <span className="text-sm text-gray-500">Chambre {room.numero}</span>
                </div>
                <p className="text-3xl font-bold text-blue-600">{room.prix}€ / nuit</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {room.description || 'Chambre confortable et élégante avec tout le confort moderne.'}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Capacité</h2>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users className="h-5 w-5" />
                  <span>{room.capacite} personnes maximum</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Équipements</h2>
                <div className="grid grid-cols-2 gap-3">
                  {room.equipements.map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2 text-gray-700">
                      {equipmentIcons[equipment] || <span>•</span>}
                      <span className="capitalize">{equipment}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleReservation}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

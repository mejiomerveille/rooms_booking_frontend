import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, CreditCard, Check } from 'lucide-react';
import { roomService, Room } from '../services/roomService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const BookRoom = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [paymentMode, setPaymentMode] = useState('carte bancaire');
  const [error, setError] = useState('');

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

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !room) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights * room.prix;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!id) return;

    try {
      await bookingService.createBooking({
        room_id: id,
        check_in: checkIn,
        check_out: checkOut,
        mode_paiement: paymentMode,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/mes-reservations');
      }, 2000);
    } catch (err) {
      setError('Impossible de créer la réservation. Veuillez vérifier les dates.');
    } finally {
      setSubmitting(false);
    }
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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Réservation confirmée !
          </h2>
          <p className="text-gray-600">
            Vous allez être redirigé vers vos réservations...
          </p>
        </div>
      </div>
    );
  }

  const total = calculateTotal();
  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la réservation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informations du client</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Nom:</span> {user?.nom}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                {user?.telephone && (
                  <div>
                    <span className="font-medium">Téléphone:</span> {user.telephone}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Détails de la réservation</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date d'arrivée
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date de départ
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Mode de paiement
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="carte bancaire">Carte bancaire</option>
                  <option value="especes">Espèces</option>
                  <option value="virement">Virement bancaire</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting || !checkIn || !checkOut}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
              >
                {submitting ? 'Traitement...' : 'Confirmer la réservation'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>

              <div className="mb-4">
                <img
                  src={room.photos?.[0]?.url || 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'}
                  alt={room.type}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <h3 className="font-bold text-lg mb-2">{room.type}</h3>
              <p className="text-gray-600 mb-4">Chambre {room.numero}</p>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix par nuit:</span>
                  <span className="font-semibold">{room.prix}€</span>
                </div>
                {nights > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nombre de nuits:</span>
                    <span className="font-semibold">{nights}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-blue-600">{total}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

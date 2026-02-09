import { useState, useEffect } from 'react';
import { bookingService, Booking } from '../services/bookingService';
import { Calendar, MapPin, X } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  // const fetchBookings = async () => {
  //   try {
  //     const data = await bookingService.getBookings();
  //     setBookings(data);
  //   } catch (error) {
  //     console.error('Error fetching bookings:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchBookings = async () => {
  try {
    const data = await bookingService.getBookings();
    console.log('Bookings response:', data); // ← garde ce log
    
    // ✅ FIX : ton backend renvoie { data: Booking[] }
    setBookings(data.data);  // ← AJOUTE .data
    // console.log(data.data);
  } catch (error) {
    console.error('Error fetching bookings:', error);
  } finally {
    setLoading(false);
  }
};


  const handleCancel = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) return;

    try {
      await bookingService.cancelBooking(id);
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Mes Réservations</h1>
          <p className="text-xl">Gérez vos réservations en cours et passées</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600">Vous n'avez aucune réservation</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {booking.room?.type || 'Chambre'}
                      </h3>
                      <p className="text-gray-600">Chambre {booking.room?.numero}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(booking.statut)}`}>
                        {getStatusText(booking.statut)}
                      </span>
                      {(booking.statut === 'pending' || booking.statut === 'confirmed') && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                          <span>Annuler</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold">Dates</span>
                      </div>
                      <p className="text-gray-900">
                        Du {new Date(booking.check_in).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-gray-900">
                        Au {new Date(booking.check_out).toLocaleDateString('fr-FR')}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="h-5 w-5" />
                        <span className="font-semibold">Détails</span>
                      </div>
                      <p className="text-gray-900">{booking.nombre_nuits} nuits</p>
                      <p className="text-gray-900">Paiement: {booking.mode_paiement}</p>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-2 font-semibold">Montant total</div>
                      <p className="text-3xl font-bold text-blue-600">{booking.montant}FCFA</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

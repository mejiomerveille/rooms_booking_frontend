import { Utensils, Wifi, Dumbbell, Coffee, Car, Briefcase } from 'lucide-react';

const SERVICES = [
  {
    icon: <Utensils className="h-12 w-12" />,
    title: 'Restaurant Gastronomique',
    description: 'Savourez une cuisine raffinée préparée par notre chef étoilé. Ouvert tous les jours de 7h à 23h.',
    image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
  },
  {
    icon: <Coffee className="h-12 w-12" />,
    title: 'Spa & Wellness',
    description: 'Détendez-vous dans notre spa de luxe avec massages, sauna et hammam.',
    image: 'https://images.pexels.com/photos/3201694/pexels-photo-3201694.jpeg',
  },
  {
    icon: <Briefcase className="h-12 w-12" />,
    title: 'Salles de Conférence',
    description: 'Espaces modernes et équipés pour vos événements professionnels jusqu\'à 200 personnes.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
  },
  {
    icon: <Dumbbell className="h-12 w-12" />,
    title: 'Salle de Fitness',
    description: 'Centre de remise en forme équipé des dernières machines. Accès 24h/24.',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
  },
  {
    icon: <Wifi className="h-12 w-12" />,
    title: 'WiFi Haut Débit',
    description: 'Connexion internet gratuite et ultra-rapide dans tout l\'établissement.',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
  },
  {
    icon: <Car className="h-12 w-12" />,
    title: 'Parking Sécurisé',
    description: 'Parking privé surveillé 24h/24 pour votre tranquillité d\'esprit.',
    image: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg',
  },
];

export const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl">
            Des prestations de qualité pour un séjour inoubliable
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-blue-600">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Services Additionnels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="font-semibold text-gray-900 mb-2">Service en Chambre 24/7</p>
              <p className="text-gray-600">Disponible à toute heure</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 mb-2">Conciergerie</p>
              <p className="text-gray-600">À votre service pour toutes vos demandes</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 mb-2">Navette Aéroport</p>
              <p className="text-gray-600">Service gratuit sur réservation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';
import { Bed, Calendar, Users } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Dashboard Admin</h1>
          <p className="text-xl">Gérez votre hôtel en toute simplicité</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/admin/chambres"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <Bed className="h-12 w-12 text-blue-600 group-hover:scale-110 transition" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Chambres</h2>
            <p className="text-gray-600">Gérer les chambres et leurs photos</p>
          </Link>

          <Link
            to="/admin/reservations"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-12 w-12 text-blue-600 group-hover:scale-110 transition" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Réservations</h2>
            <p className="text-gray-600">Voir et gérer toutes les réservations</p>
          </Link>

          <Link
            to="/admin/utilisateurs"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="h-12 w-12 text-blue-600 group-hover:scale-110 transition" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Utilisateurs</h2>
            <p className="text-gray-600">Gérer les comptes utilisateurs</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

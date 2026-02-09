import { Link, useNavigate } from 'react-router-dom';
import { Hotel, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Grand Hotel</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
              Accueil
            </Link>
            <Link to="/chambres" className="text-gray-700 hover:text-blue-600 transition">
              Chambres
            </Link>
            <Link to="/galerie" className="text-gray-700 hover:text-blue-600 transition">
              Galerie
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition">
              Services
            </Link>
            <Link to="/a-propos" className="text-gray-700 hover:text-blue-600 transition">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/mes-reservations"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Mes réservations
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
              >
                <User className="h-4 w-4" />
                <span>Connexion</span>
              </Link>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                Accueil
              </Link>
              <Link to="/chambres" className="text-gray-700 hover:text-blue-600 transition">
                Chambres
              </Link>
              <Link to="/galerie" className="text-gray-700 hover:text-blue-600 transition">
                Galerie
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition">
                Services
              </Link>
              <Link to="/a-propos" className="text-gray-700 hover:text-blue-600 transition">
                À propos
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition">
                      Dashboard
                    </Link>
                  )}
                  <Link to="/mes-reservations" className="text-gray-700 hover:text-blue-600 transition">
                    Mes réservations
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-blue-600 transition"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

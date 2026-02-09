import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, Menu, Bed, Calendar, Users, BarChart3, Settings, LogOut 
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/chambres', label: 'Chambres', icon: Bed },
    { path: '/admin/reservations', label: 'Réservations', icon: Calendar },
    { path: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  ];

  return (
    <>
      {/* Overlay mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`bg-white shadow-2xl border-r border-gray-200 fixed z-50 h-screen w-72
        lg:static lg:translate-x-0 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bed className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Admin Hôtel
                </h2>
                <p className="text-xs text-gray-500 font-medium">Panneau de contrôle</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="p-6 space-y-1">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 group hover:shadow-md
                ${location.pathname === path
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-[1.02]'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:scale-[1.01] hover:shadow-lg'
                }`}
            >
              <Icon className={`h-5 w-5 mr-4 group-hover:scale-110 transition-transform flex-shrink-0
                ${location.pathname === path ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
              <span className="whitespace-nowrap">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 border-t border-gray-100">
            <Link
              to="/"
              className="flex items-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] hover:from-red-600 hover:to-red-700 
                transition-all duration-200 transform"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

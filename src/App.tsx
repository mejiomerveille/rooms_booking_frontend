import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { RoomDetail } from './pages/RoomDetail';
import { Gallery } from './pages/Gallery';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BookRoom } from './pages/BookRoom';
import { MyBookings } from './pages/MyBookings';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminRooms } from './pages/admin/AdminRooms';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminLayout } from './pages/admin/AdminLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Routes publiques + client (Layout principal) */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chambres" element={<Rooms />} />
            <Route path="/chambres/:id" element={<RoomDetail />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes CLIENT */}
            <Route path="/reserver/:id" element={
              <ProtectedRoute>
                <BookRoom />
              </ProtectedRoute>
            } />
            <Route path="/mes-reservations" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
          </Route>

          {/* Routes ADMIN (Protected + AdminLayout) */}
          <Route path="/admin/*" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="chambres" element={<AdminRooms />} />
            <Route path="reservations" element={<AdminBookings />} />
            <Route path="utilisateurs" element={<AdminUsers />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;

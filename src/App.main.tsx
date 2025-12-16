import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Shop pages (public)
import BeatsShop from './pages/shop/BeatsPage';

// Customer pages (protected - user role)
import CustomerDashboard from './pages/customer/DashboardPage';
import CustomerOrders from './pages/customer/OrdersPage';
import CustomerDownloads from './pages/customer/DownloadsPage';
import CustomerProfile from './pages/customer/ProfilePage';

// Artist pages (protected - artist role)
import ArtistDashboard from './pages/artist/DashboardPage';
import ArtistCollaborations from './pages/artist/CollaborationsPage';

// Admin pages (protected - admin role)
import AdminDashboard from './pages/admin/DashboardPage';
import AdminBeats from './pages/admin/BeatsPage';
import AdminOrders from './pages/admin/OrdersPage';
import AdminCollaborations from './pages/admin/CollaborationsPage';

const MainApp: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Shop Routes (public) */}
          <Route path="/shop/beats" element={<BeatsShop />} />

          {/* Customer Routes (protected - user role) */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/orders"
            element={
              <ProtectedRoute>
                <CustomerOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/downloads"
            element={
              <ProtectedRoute>
                <CustomerDownloads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />

          {/* Artist Routes (protected - artist role) */}
          <Route
            path="/artist/dashboard"
            element={
              <ProtectedRoute>
                <ArtistDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/collaborations"
            element={
              <ProtectedRoute>
                <ArtistCollaborations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/beats"
            element={
              <ProtectedRoute>
                <BeatsShop />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes (protected - admin role) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/beats"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminBeats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/collaborations"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminCollaborations />
              </ProtectedRoute>
            }
          />

          {/* Redirect /admin to dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default MainApp;

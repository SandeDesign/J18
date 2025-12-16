import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin pages
import AdminLoginPage from './pages/admin/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import BeatsPage from './pages/admin/BeatsPage';
import OrdersPage from './pages/admin/OrdersPage';
import CollaborationsPage from './pages/admin/CollaborationsPage';

const MainApp: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/beats"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BeatsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute requireAdmin={true}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/collaborations"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CollaborationsPage />
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

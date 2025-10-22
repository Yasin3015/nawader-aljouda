// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// للصفحات اللي محتاجة تسجيل دخول
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">جاري التحميل...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

// للصفحات اللي ما ينفعش المستخدم المسجل يدخلها (مثل صفحة التسجيل)
export const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">جاري التحميل...</div>;
  }

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};
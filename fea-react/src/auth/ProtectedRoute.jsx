import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="empty-state" style={{ marginTop: 60 }}><p>Loading&hellip;</p></div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

import { getTokensCookie } from '@/lib/utils';
import useAuthStore from '@/store/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { pathname } = useLocation();
  const { role, isLoggedIn } = useAuthStore();

  const { access_token, refresh_token } = getTokensCookie()
  let hasTokens = !!access_token! && !!refresh_token!;

  if (hasTokens && (pathname === "/login" || pathname === "/")) {

  }

  if (!hasTokens) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    if (isLoggedIn) return <Navigate to="/403" replace />;

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
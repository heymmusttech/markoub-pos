import { getTokensCookie } from '@/lib/utils';
import useAuthStore from '@/store/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
  const { pathname } = useLocation();
  const { role } = useAuthStore();


  const { access_token, refresh_token } = getTokensCookie()
  let hasTokens = !!access_token! && !!refresh_token!;

  if (hasTokens && (pathname === "/login" || pathname === "/")) {
    if (role === "vendor") return <Navigate to="/vendor" replace />;
    if (role === "admin") return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
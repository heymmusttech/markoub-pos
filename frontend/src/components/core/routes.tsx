// src/routes.js
import { getTokensCookie } from '@/lib/utils';
import { default as AdminPage } from '@/pages/admin';
import AddTripPage from '@/pages/admin/add-trip';
import AllTripsPage from '@/pages/admin/all-trips';
import DashbaordPage from '@/pages/admin/dashboard';
import SignInPage from '@/pages/auth';
import ForbiddenPage from '@/pages/other/403';
import NotFoundPage from '@/pages/other/404';
import WelcomePage from '@/pages/other/welcome';
import VendorPage from '@/pages/vendor';
import BookingPage from '@/pages/vendor/booking';
import CheckoutPage from '@/pages/vendor/checkout';
import SearchTripsPage from '@/pages/vendor/search-trips';
import TicketsSoldPage from '@/pages/vendor/tickets-sold';
import useAuthStore from '@/store/auth-store';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protected-routes';
import PublicRoute from './public-routes';

const AppRoutes = () => {
    const { role, isLoggedIn } = useAuthStore((state) => state);

    const redirectToLogin = () => {
        const { access_token, refresh_token } = getTokensCookie()
        let hasTokens = !!access_token! && !!refresh_token!;
        let redirectPathname = "/404";

        if (!!isLoggedIn && !!hasTokens) {
            if (role === "vendor") redirectPathname = "/vendor";
            if (role === "admin") redirectPathname = "/dashboard";
        }

        return redirectPathname;
    }
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<SignInPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/dashboard" element={<AdminPage />}>
                    <Route index element={<DashbaordPage />} />
                    <Route path="trips" element={<AllTripsPage />} />
                    <Route path="trips/add" element={<AddTripPage />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
                <Route path="/vendor" element={<VendorPage />}>
                    <Route index element={<SearchTripsPage />} />
                    <Route path="search" element={<SearchTripsPage />} />
                    <Route path="booking/:id" element={<BookingPage />} />
                    <Route path="sold-tickets" element={<TicketsSoldPage />} />
                    <Route path="checkout/:id" element={<CheckoutPage />} />
                </Route>
            </Route>
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="*" element={<Navigate to={redirectToLogin()} replace />} />
        </Routes>
    );
};

export default AppRoutes;

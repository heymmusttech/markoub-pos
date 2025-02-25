import { getMe } from "@/api/services/user-service";
import useAuthStore from "@/store/auth-store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const GlobalLayout = ({ children }: Props) => {
    const { pathname } = useLocation()
    const { login } = useAuthStore((state) => state);

    const onMe = async () => {
        if (pathname !== "/login") {
            try {
                const result = await getMe();
                const { role, tokens, ...rest } = result;
                await login({ ...rest }, role);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
    };

    useEffect(() => {
        onMe();
    }, []);

    return (
        <div className="global-layout border border-gray-200">
            {children}
        </div>
    );
};

export default GlobalLayout;
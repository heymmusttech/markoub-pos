import { AdminLayout } from "@/layouts";
import { Outlet } from "react-router-dom";

interface Props {
    children?: React.ReactNode;
}

const AdminPage = ({ children }: Props) => {
    return (
        <AdminLayout>
            <>
                {children}
                <Outlet />
            </>
        </AdminLayout>
    )
}

export default AdminPage

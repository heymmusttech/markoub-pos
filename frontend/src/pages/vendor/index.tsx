
import { VendorLayout } from "@/layouts";
import { Outlet } from "react-router-dom";

interface Props {
    children?: React.ReactNode;
}

const VendorPage = ({ children }: Props) => {
    return (
        <VendorLayout>
            {children}
            <Outlet />
        </VendorLayout>
    )
}

export default VendorPage

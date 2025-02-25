import { logo } from "@/common";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenuProfile } from "../other/dropdown-menu-profile";




const Header = () => {
    const { pathname } = useLocation();

    const isVendor = pathname.includes('/vendor');
    const isAdmin = pathname.includes('/dashboard');

    return (
        <div className="header-wrapper flex justify-between p-3 fixed top-0 left-0 right-0 bg-slate-50 m-2 w-[calc(100vw-16px)] rounded-md z-40">
            <div className="flex items-center gap-8">
                <div className="logo">
                    <img src={logo} alt="logo" className="h-5 w-auto" />
                </div>
                <div>
                    {/* Vendor Links */}
                    {isVendor && (
                        <div className="hidden md:flex gap-6 items-center font-medium uppercase">
                            <Link to="/vendor" className="text-primary">
                                <span className="text-[12px] font-bold">Book Ticket</span>
                            </Link>
                            <Link to="/vendor/sold-tickets" className="text-primary">
                                <span className="text-[12px] font-bold">Sold Tickets</span>
                            </Link>
                        </div>
                    )}

                    {/* Admin Links */}
                    {isAdmin && (
                        <div className="hidden md:flex gap-6 items-center font-medium uppercase">
                            <Link to="/dashboard" className="text-primary">
                                <span className="text-[12px] font-bold">Dashboard</span>
                            </Link>
                            <Link to="/dashboard/trips" className="text-primary">
                                <span className="text-[12px] font-bold">All Trips</span>
                            </Link>
                            {/* <Link to="/dashboard/trips/add" className="text-primary">
                                <span className="text-[12px] font-bold">Add New Trip</span>
                            </Link> */}
                        </div>
                    )}
                </div>
            </div>
            <div className="navigation">
                <DropdownMenuProfile />
            </div>
        </div>
    )
}

export default Header

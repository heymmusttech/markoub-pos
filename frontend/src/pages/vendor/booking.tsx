import BookingFrom from "@/components/forms/booking-form";
import { Breadcrumbs } from "@/components/other/breadcrumb";


const BookingPage = () => {
    return (
        <div>
            <Breadcrumbs
                list={[
                    { name: "Vendor", href: "/vendor" },
                    { name: "Booking Trip", href: "/vendor/booking" },
                ]}
            />

            <BookingFrom />
        </div>
    );
};

export default BookingPage;

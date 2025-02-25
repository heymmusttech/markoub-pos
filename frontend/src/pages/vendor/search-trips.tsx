import SearchTripForm from "@/components/forms/search-form";
import { Breadcrumbs } from "@/components/other/breadcrumb";
const SearchTripsPage = () => {
    return (
        <>
            <Breadcrumbs
                list={[
                    { name: "Vendor", href: "/vendor" },
                    { name: "Search Trips", href: "/vendor/search-trips" },
                ]}
            />

            <SearchTripForm />
        </>
    );
};

export default SearchTripsPage;

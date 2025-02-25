import TripsList from "@/components/lists/trips-list"
import { Breadcrumbs } from "@/components/other/breadcrumb"

const AllTripsPage = () => {
    return (
        <div>
            <Breadcrumbs
                list={[
                    { name: "Dashboard", href: "/dashboard" },
                    { name: "All Trips", href: "/dashboard/trips" },
                ]}
            />

            <TripsList />
        </div>
    )
}

export default AllTripsPage

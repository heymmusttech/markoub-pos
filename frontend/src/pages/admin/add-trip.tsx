import CreateTripForm from "@/components/forms/add-trips-form"
import { Breadcrumbs } from "@/components/other/breadcrumb"

const AddTripPage = () => {
    return (
        <div className="max-w-[600px] w-full mx-auto">
            <Breadcrumbs
                list={[
                    { name: "Dashboard", href: "/dashboard" },
                    { name: "Add New Trip", href: "/dashboard/booking" },
                ]}
            />

            <CreateTripForm />
        </div>
    )
}

export default AddTripPage

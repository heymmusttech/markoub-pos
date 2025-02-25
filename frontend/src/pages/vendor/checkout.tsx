import CheckoutForm from "@/components/forms/checkout-form"
import { Breadcrumbs } from "@/components/other/breadcrumb"

const CheckoutPage = () => {
    return (
        <div>
            <Breadcrumbs
                list={[
                    { name: "Vendor", href: "/vendor" },
                    { name: "Sold Tickets", href: "/vendor/sold-tickets" },
                    { name: "Ticket Detail", href: "/vendor/checkout" },
                ]}
            />

            <CheckoutForm />
        </div>
    )
}

export default CheckoutPage

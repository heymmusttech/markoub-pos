import { useQueryTicketSales } from "@/api/services/tickets-service";
import TicketsSoldList from "@/components/lists/tickets-sold-list";
import { Breadcrumbs } from "@/components/other/breadcrumb";

const TicketsSoldPage = () => {
    const { data } = useQueryTicketSales();

    return (
        <div>
            <Breadcrumbs list={[
                { name: 'Vendor', href: '/vendor' },
                { name: 'Sold Tickets', href: '/vendor/sold-tickets' },
            ]} />

            {data && <TicketsSoldList list={data} />}
        </div>
    )
}

export default TicketsSoldPage

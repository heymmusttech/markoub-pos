import SalesRecordList from "@/components/lists/sales-record-list"
import { Breadcrumbs } from "@/components/other/breadcrumb"

const DashbaordPage = () => {
    return (
        <div>
            <Breadcrumbs
                list={[
                    { name: "Dashboard", href: "/dashboard" },
                    { name: "Sales Records Overview", href: "/dashboard" },
                ]}
            />

            <SalesRecordList />
        </div>
    )
}

export default DashbaordPage

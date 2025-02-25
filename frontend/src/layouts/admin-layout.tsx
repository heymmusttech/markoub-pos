import Header from "@/components/partails/header";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="pt-[100px] py-8 p-3 w-full max-w-screen min-h-screen rounded-md top-0 left-0 right-0">
        <div className="max-w-[1000px] w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout

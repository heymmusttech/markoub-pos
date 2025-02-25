
const ForbiddenPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 text-center max-w-[600px] w-full mx-auto">
                <h5 className="text-slate-600 text-sm font-bold">
                    403 Forbidden
                </h5>
                <p className="text-slate-500 text-sm mt-2 max-w-[300px] w-full mx-auto">
                    Ooops! The page you are looking for does not exist.
                </p>
            </div>
        </div>
    )
}

export default ForbiddenPage

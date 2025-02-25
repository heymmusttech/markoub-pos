import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className='max-w-[1200px] w-full mx-auto flex flex-col items-start justify-start gap-4 mt-4'>
                <div className="text-left">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">
                        Welcome to Our POS System
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                        Easily book and manage your bus tickets in just a few simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8 mt-8">
                    {/* Step 1: Search Trip */}
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 mx-auto w-full">
                        <div className="flex flex-col items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                1
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Search Trip</h3>
                            <p className="text-sm text-slate-600 font-medium -mt-4">
                                Find your favorite trip
                            </p>
                            <p className="text-sm text-slate-500">
                                Enter your departure and destination to find available trips.
                            </p>
                        </div>
                    </div>

                    {/* Step 2: Book Ticket */}
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 mx-auto w-full">
                        <div className="flex flex-col gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                2
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Book Ticket</h3>
                            <p className="text-sm text-slate-600 font-medium -mt-4">
                                Reserve your seat
                            </p>
                            <p className="text-sm text-slate-500">
                                Select a preferred seat and provide passenger details to book your ticket.
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Confirm and Print/Download PDF */}
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 mx-auto w-full">
                        <div className="flex flex-col gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                3
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Confirm Ticket
                            </h3>
                            <p className="text-sm text-slate-600 font-medium -mt-4">
                                Generate PDF ticket
                            </p>
                            <p className="text-sm text-slate-500">
                                Confirm your booking and download or print your ticket as a PDF.
                            </p>
                        </div>
                    </div>

                    {/* Step 4: Manege Trips and Sold Tickets */}
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 mx-auto w-full">
                        <div className="flex flex-col gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                4
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Manege Trips and Sales
                            </h3>
                            <p className="text-sm text-slate-600 font-medium -mt-4">
                                Manage your trips and sold tickets
                            </p>
                            <p className="text-sm text-slate-500">
                                You can view and manage your trips and sold tickets. with overviews and detailed information.
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleLoginRedirect}
                    className="mt-12 bg-primary text-white px-6 py-2 rounded-md"
                >
                    Login to Get Started
                </Button>
            </div>
        </div>
    );
};

export default WelcomePage;
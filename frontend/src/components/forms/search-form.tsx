import { useQueryTrips } from '@/api/services/trips-service';
import { cities } from '@/common';
import { SearchSchema, SearchType } from '@/schemas/search-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatDistance, isPast } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Combobox } from '../other/combobox';
import Datepicker from '../other/datepicker';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
const useQuery = () => new URLSearchParams(useLocation().search);

const SearchTripForm = () => {
    const navigate = useNavigate();
    const query = useQuery();

    const [filter, setFilter] = useState({
        departure: query.get('departure') || '',
        destination: query.get('destination') || '',
        date: query.get('date') || '',
    });
    const { departure, destination, date } = filter;

    const { data, isLoading } = useQueryTrips(departure, destination, date);

    const form = useForm({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            departure,
            destination,
            date: new Date(date! as string) ?? undefined,
        },
    });

    const onSubmit = async (data: SearchType) => {
        const queries = {
            departure: data.departure,
            destination: data.destination,
            date: format(data.date, 'yyyy-MM-dd'),
        };

        const searchParams = new URLSearchParams(queries);
        setFilter(queries);

        navigate(`/vendor/search?${searchParams.toString()}`);
    };

    const isSearched = !!departure && !!destination && !!date;

    const onBookingAction = (id: number) => {
        navigate(`/vendor/booking/${id}`);
    };

    console.log(form.getValues().date);

    return (
        <>
            {/* Search Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col gap-3 md:flex-row md:gap-4 bg-slate-100 p-4 rounded-md mt-4">
                        <Combobox
                            label="Departure *"
                            data={cities}
                            form={form}
                            name="departure"
                            className="md:w-1/4"
                        />
                        <Combobox
                            label="Destination *"
                            data={cities}
                            form={form}
                            name="destination"
                            className="md:w-1/4"
                        />
                        <Datepicker
                            label="Date of trip *"
                            form={form}
                            name="date"
                            className="md:w-1/4"
                        />
                        <Button className="md-3 md:mt-5 w-full md:w-1/4" type="submit">
                            Search
                        </Button>
                    </div>
                </form>
            </Form>

            {/* Search Result */}
            {isSearched && (
                <div className="mt-6 space-y-4">
                    {data?.map((trip: any) => {
                        return (
                            <div
                                key={trip.id}
                                className="flex flex-col gap-4 md:flex-row md:gap-16 p-4 py-3 rounded-md bg-slate-50 border border-slate-200 justify-between items-start md:items-center"
                            >
                                <div className="flex flex-row gap-8 md:items-center justify-between w-full ">
                                    <div className="flex flex-col gap-2 md:flex-row md:gap-8 items-start md:items-center">
                                        <div className="text-sm text-slate-500 flex items-center gap-4">
                                            <div>
                                                <h3 className="font-bold text-2xl text-primary">
                                                    {format(trip.departure_time, 'HH:mm')}
                                                </h3>
                                                <h5 className="text-slate-500 italic">
                                                    {trip.departure}
                                                </h5>
                                            </div>
                                            <span className="w-8 h-[1px] bg-slate-400"></span>
                                            <div>
                                                <h3 className="font-bold text-2xl text-primary">
                                                    {format(trip.destination_time, 'HH:mm')}
                                                </h3>
                                                <h5 className="text-slate-500 italic">
                                                    {trip.destination}
                                                </h5>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                                            <div className="text-slate-500 text-sm border border-slate-200 rounded-full px-3 py-1 bg-slate-100">
                                                {formatDistance(
                                                    trip.departure_time,
                                                    trip.destination_time,
                                                )}
                                            </div>

                                            <div className="text-slate-500 text-sm border border-slate-200 rounded-full px-3 py-1 bg-slate-100">
                                                {trip.availableSeats} Seats
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-primary text-2xl font-extrabold text-right md:text-left">
                                        {trip.price}{' '}
                                        <span className="text-sm font-medium -mt-2 md:mt-0 relative">
                                            MAD
                                        </span>
                                    </div>
                                </div>



                                <div>
                                    <Button
                                        type="button"
                                        className="rounded-full w-full"
                                        disabled={
                                            trip.availableSeats === 0 ||
                                            isPast(new Date(trip.departure_time))
                                        }
                                        onClick={() => onBookingAction(trip.id)}
                                    >
                                        {isPast(new Date(trip.departure_time))
                                            ? 'Departed'
                                            : trip.availableSeats === 0
                                                ? 'Fully Booked'
                                                : 'Book Ticket'}
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* No Result */}
            {!isLoading && !data?.length && (
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 text-center w-full mx-auto">
                        <h5 className="text-slate-600 text-sm font-bold">
                            No result foumd!
                        </h5>
                        <p className="text-slate-500 text-sm mt-2 max-w-[440px] w-full mx-auto">
                            Ooops! No result found for the given criteria.
                            <br />
                            please choose other date or destinations. or maybe will be
                            available in the next few days.
                        </p>
                    </div>
                </div>
            )}

            {/* Boarding Details */}
            {!isSearched && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-8">
                    {/* Step 1: Search Trip */}
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 mx-auto w-full">
                        <div className="flex flex-col items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                1
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Search Trip</h3>
                            <p className="text-sm text-slate-600 font-medium -mt-4">
                                Find favorite trip
                            </p>
                            <p className="text-sm text-slate-500">
                                Enter passenger departure and destination to find available
                                trips.
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
                                Reserve passenger seat
                            </p>
                            <p className="text-sm text-slate-500">
                                Select a preferred seat and provide passenger details to book
                                new ticket.
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
                </div>
            )}
        </>
    );
};

export default SearchTripForm;

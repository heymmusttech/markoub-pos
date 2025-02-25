import { onBookingTicket } from '@/api/services/tickets-service';
import { useQueryTripsById } from '@/api/services/trips-service';
import { ErrorResponse } from '@/interfaces';
import { BookingSchema, BookingType } from '@/schemas/booking-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import BusSeatMap from '../other/bus-seats-map';
import CustomInput from '../other/custom-input';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

const BookingFrom = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useQueryTripsById(Number(id!));

    const form = useForm({
        resolver: zodResolver(BookingSchema),
    });

    const onSubmit = async (payload: BookingType) => {
        try {
            const result = await onBookingTicket(Number(id!), payload);
            const { id: ticketId } = result;
            navigate(`/vendor/checkout/${ticketId}`);

            toast('You have successfully booked a ticket!', {
                description: 'You can now confrim the payment and access your ticket.',
                action: {
                    label: 'Ok',
                    onClick: () => { },
                },
            });
        } catch (error) {
            console.error('Login failed:', error);

            const { response } = error as AxiosError<ErrorResponse>;
            const message = response?.data?.message! || 'Something went wrong.';

            toast('Booking failed! Please try again.', {
                description: message,
                action: {
                    label: 'Ok',
                    onClick: () => { },
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                <div className="flex flex-col-reverse gap-4 md:grid md:grid-cols-2 md:gap-6">
                    <div className="border border-slate-200 rounded-md min-h-[500px] p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col gap-2 mb-6">
                                <h3 className="text-lg font-bold text-slate-700">
                                    Booking Details
                                </h3>
                                <p className="text-slate-700 text-sm max-w-[400px]">
                                    Select for the passenger seat and provide the needed details
                                    to book a new ticket.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <CustomInput
                                    name="name"
                                    form={form}
                                    label="Name *"
                                    placeholder="Enter your name"
                                />
                                <CustomInput
                                    name="phone"
                                    form={form}
                                    label="Phone *"
                                    placeholder="Enter your phone number"
                                />
                                <CustomInput
                                    name="email"
                                    form={form}
                                    label="Email (Optional)"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <Button className="w-full mt-8" type="submit">
                            Book Ticket
                        </Button>
                    </div>
                    <div className="border border-slate-200 rounded-md min-h-[500px] p-4">
                        <div className="flex flex-col gap-2 mb-6">
                            <h3 className="text-lg font-bold text-slate-700">
                                Select Passenger Seat
                            </h3>
                            <p className="text-slate-700 text-sm max-w-[400px]">
                                Choose passanger preferred seat for a comfortable journey. Pick from
                                the available seat.
                            </p>
                        </div>
                        <BusSeatMap
                            totalSeats={50}
                            bookedSeats={data?.bookedSeats || []}
                            form={form}
                            name="seatNumber"
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default BookingFrom;

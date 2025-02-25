import { Ticket } from '@/interfaces';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import React from 'react';
import { Button } from '../ui/button';

interface TicketProps {
    ticket: Ticket;
    onConfirm: () => void;
}

const TicketConfirmationForm: React.FC<TicketProps> = ({
    ticket,
    onConfirm,
}) => {
    return (
        <div className="bg-white overflow-hidden">
            <div className="py-4">
                <div className="flex flex-col gap-4 relative">
                    <span className="text-slate-800 text-sm">
                        Ticket Detial #{ticket.id}
                    </span>

                    <h2 className="text-primary text-2xl font-extrabold text-right md:text-left absolute top-0 right-0 -mt-1">
                        {ticket.trip.price}{' '}
                        <span className="text-sm font-medium md:mt-0 -top-1 relative">
                            MAD
                        </span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 ticket.-stretch">
                        <div className="flex-1 text-sm text-slate-500 flex flex-col gap-1 bg-slate-50 px-2.5 py-1.5 rounded-md">
                            <div className="text-[10px] text-slate-500">Trip Details</div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="font-bold text-2xl text-primary">
                                        {format(ticket.trip.departure_time, 'HH:mm')}
                                    </h3>
                                    <h5 className="text-slate-500 italic">
                                        {ticket.trip.departure}
                                    </h5>
                                </div>
                                <span className="w-8 h-[1px] bg-slate-400"></span>
                                <div>
                                    <h3 className="font-bold text-2xl text-primary">
                                        {format(ticket.trip.destination_time, 'HH:mm')}
                                    </h3>
                                    <h5 className="text-slate-500 italic">
                                        {ticket.trip.destination}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 text-sm text-slate-500 flex flex-col gap-1 bg-slate-50 px-2.5 py-1.5 rounded-md">
                            <div className="text-[10px] text-slate-500">
                                Passenger Details
                            </div>
                            <div className="flex flex-col gap-0">
                                <div className="text-slate-700 flex gap-4">
                                    <span className="text-slate-500 text-[11px] flex-[1]">
                                        Name /
                                    </span>
                                    <span className="flex-[3]">{ticket.passenger.name}</span>
                                </div>
                                <div className="text-slate-700 flex gap-4">
                                    <span className="text-slate-500 text-[11px] flex-[1]">
                                        Phone /
                                    </span>
                                    <span className="flex-[3]">{ticket.passenger.phone}</span>
                                </div>
                                <div className="text-slate-700 flex gap-4">
                                    <span className="text-slate-500 text-[11px] flex-[1]">
                                        Email /
                                    </span>
                                    <span className="flex-[3]">
                                        {ticket.passenger.email || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className='flex flex-col gap-1'>
                            <div className={cn(['text-slate-500 text-[13px] flex gap-1'])}>
                                <span className="opacity-75">Seat No. /</span>
                                <div
                                    className={cn([
                                        'font-semibold text-primary'
                                    ])}
                                >
                                    {ticket.seatNumber ?? 'N/A'}
                                </div>
                            </div>
                            <div className={cn(['text-slate-500 text-[13px] flex gap-1'])}>
                                <span className="opacity-75">Status /</span>
                                <div
                                    className={cn([
                                        'font-semibold',
                                        ticket.isPaid && 'text-green-600',
                                    ])}
                                >
                                    {ticket.isPaid ? 'Paid' : 'Not Paid'}
                                </div>
                            </div>
                        </div>
                        <Button
                            className='font-semibold'
                            type="button"
                            onClick={onConfirm}
                            disabled={!!ticket.isPaid}
                        >
                            Confirm Sale (Ticket)
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketConfirmationForm;

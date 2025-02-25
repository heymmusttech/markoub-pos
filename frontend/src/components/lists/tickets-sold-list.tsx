import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface Props {
    list: any[];
}

const TicketsSoldList = ({ list }: Props) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                {list.map((item) => (
                    <div
                        key={item.ticketId}
                        className="border border-slate-200 rounded-md p-4"
                    >
                        <div className="flex flex-col gap-4 relative">
                            <span className="text-slate-800 text-sm">
                                Ticket Detial #{item.ticketId}
                            </span>

                            <h2 className="text-primary text-2xl font-extrabold text-right md:text-left absolute top-0 right-0 -mt-1">
                                {item.trip.price}{' '}
                                <span className="text-sm font-medium md:mt-0 -top-1 relative">
                                    MAD
                                </span>
                            </h2>

                            <div className="flex flex-col justify-center md:flex-row gap-4 items-stretch">
                                <div className="flex-1 text-sm text-slate-500 flex flex-col gap-1 bg-slate-50 px-2.5 py-1.5 rounded-md">
                                    <div className="text-[10px] text-slate-500">Trip Details</div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-2xl text-primary">
                                                {format(item.trip.departure_time, 'HH:mm')}
                                            </h3>
                                            <h5 className="text-slate-500 italic">
                                                {item.trip.departure}
                                            </h5>
                                        </div>
                                        <span className="w-8 h-[1px] bg-slate-400"></span>
                                        <div>
                                            <h3 className="font-bold text-2xl text-primary">
                                                {format(item.trip.destination_time, 'HH:mm')}
                                            </h3>
                                            <h5 className="text-slate-500 italic">
                                                {item.trip.destination}
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
                                            <span className="flex-[3]">{item.passenger.name}</span>
                                        </div>
                                        <div className="text-slate-700 flex gap-4">
                                            <span className="text-slate-500 text-[11px] flex-[1]">
                                                Phone /
                                            </span>
                                            <span className="flex-[3]">{item.passenger.phone}</span>
                                        </div>
                                        <div className="text-slate-700 flex gap-4">
                                            <span className="text-slate-500 text-[11px] flex-[1]">
                                                Email /
                                            </span>
                                            <span className="flex-[3]">
                                                {item.passenger.email || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-end justify-between gap-4'>

                                <div className={cn(['text-slate-500 text-[13px] flex gap-1'])}>
                                    <span className='opacity-75'>Status /</span>
                                    <div className={cn(["font-semibold", item.isPaid ? 'text-green-500' : 'text-red-500'])}>
                                        {item.isPaid ? 'Paid' : 'Not Paid'}
                                    </div>
                                </div>
                                <Link to={`/vendor/checkout/${item.ticketId}`} className='bg-primary px-3 py-1 rounded-full text-[12px] font-semibold text-white'>
                                    Ticket Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TicketsSoldList;

'use client';

import { useQueryTicketSalesRecord } from '@/api/services/tickets-service';
import { columnsRecords } from '../table/columns';
import { DataTable } from '../table/data-table';

const SalesRecordList = () => {
    const { data } = useQueryTicketSalesRecord();

    const salesRecord = () =>
        data?.tickets?.items?.map((ticket: any) => ({
            id: ticket.ticketId,
            amount: ticket.trip.price,
            status: ticket.isPaid ? 'paid' : 'unpaid',
            passenger: `${ticket.passenger.phone} (${ticket.passenger.name})`,
            destination: `${ticket.trip.departure} - ${ticket.trip.destination}`,
            date: ticket.trip.date,
            time: ticket.trip.departure_time,
        }));
    return (
        <div className="container mx-auto py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-md p-4 py-2 text-slate-900">
                    <h4 className="text-[12px] font-medium mb-2">Total Paid Tickets</h4>
                    <div className="flex flex-col items-start">
                        <span className='text-3xl font-bold text-green-600'>{data?.salesData?.paid?.total} MAD</span>
                        <span className='text-[11px] font-light '>({data?.salesData?.paid?.count} tickets)</span>
                    </div>
                </div>
                <div className="border border-slate-200 rounded-md p-4 py-2 text-slate-900">
                    <h4 className="text-[12px] font-medium mb-2">Total Un Paid Tickets</h4>
                    <div className="flex flex-col items-start">
                        <span className='text-3xl font-bold text-red-600'>{data?.salesData?.unpaid?.total} MAD</span>
                        <span className='text-[11px] font-light '>({data?.salesData?.unpaid?.count} tickets)</span>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                {salesRecord() && <DataTable columns={columnsRecords} data={salesRecord()} searchPlaceholder="Search passengers..." />}
            </div>
        </div>
    );
};

export default SalesRecordList;

'use client';

import { useQueryAllTrips } from '@/api/services/trips-service';
import { useNavigate } from 'react-router-dom';
import { columnsTrips } from '../table/columns';
import { DataTable } from '../table/data-table';
import { Button } from '../ui/button';

const TripsList = () => {
    const navigate = useNavigate();
    const { data } = useQueryAllTrips();

    const salesRecord = () => data;
    return (
        <div className="container mx-auto py-4">
            <div className='flex justify-between items-center'>
                <h3 className='uppercase  text-slate-700 text-2xl font-bold'>All Trips</h3>

                <Button className='mt-4' onClick={() => navigate('/dashboard/trips/add')}>
                    <span className='text-sm font-medium'>Add New Trip</span>
                </Button>
            </div>
            <div className='mt-4'>
                {salesRecord() && <DataTable columns={columnsTrips} data={salesRecord()} searchPlaceholder="Search trips..." />}
            </div>
        </div>
    );
};

export default TripsList;

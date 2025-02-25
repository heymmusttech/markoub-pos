import { SalesRecord, Trip } from '@/interfaces';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const columnsRecords: ColumnDef<SalesRecord>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                className="!border-slate-800 data-[state=checked]:!bg-slate-800"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="!border-slate-800 data-[state=checked]:!bg-slate-800"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    No.
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'destination',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Destination
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('destination')}</div>
        ),
    },
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">
                {format(row.getValue('date'), 'dd-MM-yyyy')}
            </div>
        ),
    },
    {
        accessorKey: 'time',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Time
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{format(row.getValue('time'), 'HH:mm a')}</div>
        ),
    },
    {
        accessorKey: 'passenger',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Passenger
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('passenger')}</div>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Status
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="flex items-start">
                <div
                    className={cn([
                        'capitalize px-1 py-0.5 rounded-sm font-medium',
                        row.getValue('status') === 'paid'
                            ? 'text-green-600 bg-green-50'
                            : 'text-red-600 bg-red-50',
                    ])}
                >
                    {row.getValue('status')}
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Amount
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'MAD',
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="flex items-center justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export const columnsTrips: ColumnDef<Trip>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                className="!border-slate-800 data-[state=checked]:!bg-slate-800"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="!border-slate-800 data-[state=checked]:!bg-slate-800"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    No.
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'departure',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Departure
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('departure')}</div>
        ),
    },
    {
        accessorKey: 'destination',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Destination
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('destination')}</div>
        ),
    },
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">
                {format(row.getValue('date'), 'dd-MM-yyyy')}
            </div>
        ),
    },
    {
        accessorKey: 'departure_time',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Departure Time
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">
                {format(row.getValue('departure_time'), 'HH:mm a')}
            </div>
        ),
    },
    {
        accessorKey: 'destination_time',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Arrival Time
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">
                {format(row.getValue('destination_time'), 'HH:mm a')}
            </div>
        ),
    },

    {
        accessorKey: 'availableSeats',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Available Seats
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('availableSeats')}</div>
        ),
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <Button
                    className="!px-0 !bg-transparent"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Amount
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('price'));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'MAD',
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: () => { // { row }
            return (
                <div className="flex items-center justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View trip</DropdownMenuItem>
                            <DropdownMenuItem>Delete trip</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

import { cn } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

import { format, isValid } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { Calendar } from '../ui/calendar';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

interface Props {
    name: string;
    form: UseFormReturn<any>;
    label?: string;
    className?: string;
}

const Datepicker = ({ name, form, label = '', className }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={cn(['flex flex-col gap-1 w-full', className])}>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="text-xs !text-gray-700 -mb-1">
                            {label}
                        </FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full pl-3 text-left font-normal',
                                        // !field.value && "text-muted-foreground"
                                    )}
                                    onClick={() => setOpen(!open)}
                                >
                                    {field.value && isValid(new Date(field.value)) ? (
                                        format(new Date(field.value), 'PPP')!
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 z-50" align="start">
                                <Calendar
                                    className="bg-white rounded-md border border-gray-200 shadow-md"
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                        field.onChange(date);
                                        setOpen(false);
                                    }}
                                    disabled={(date: any) =>
                                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                        date < new Date('1900-01-01')
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage className="!m-0 !mt-1 relative" />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default Datepicker;

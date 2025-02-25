import { cn, generateSeatRows } from "@/lib/utils";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface Props {
    name: string;
    form: UseFormReturn<any>;
    label?: string;
    totalSeats: number;
    bookedSeats: number[];
}

const BusSeatMap = ({ name, form, label = "", totalSeats = 50, bookedSeats = [] }: Props) => {
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

    // Example seat data
    const seatRows = generateSeatRows(totalSeats);

    const handleSeatClick = (seatNumber: number) => {
        setSelectedSeat(seatNumber);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel className="text-xs !text-gray-700 mb-2">{label}</FormLabel>
                    <div
                        className={cn([
                            "mx-auto text-xs w-full max-w-lg p-4",
                            // "border !border-slate-300 w-[240px] rounded-tl-[80px] rounded-tr-[80px] rounded-bl-[15px] rounded-br-[15px] pt-[100px]"
                        ])}
                        tabIndex={0}
                    >
                        {/* Seat Rows */}
                        {seatRows.map((row, rowIndex) => (
                            <div
                                key={`row-${rowIndex}`}
                                className="flex justify-center gap-2 mb-2"
                            >
                                {row.map((seat, seatIndex) =>
                                    seat === null ? (
                                        // Empty Space (Aisle)
                                        <div
                                            key={`space-${rowIndex}-${seatIndex}`}
                                            className="w-8 h-8"
                                        ></div>
                                    ) : (
                                        // Seat
                                        <div
                                            key={`seat-${seat}`}
                                            role="checkbox"
                                            aria-checked={selectedSeat === seat}
                                            tabIndex={-1}
                                            className={cn([
                                                "w-8 h-8 flex items-center justify-center border rounded-lg cursor-pointer",
                                                selectedSeat === seat ? "bg-primary text-white" : "bg-primary-foreground hover:bg-slate-800 hover:text-white",
                                                bookedSeats.includes(seat) && "opacity-50 bg-red-100 border-red-500 text-red-600 cursor-not-allowed hover:bg-primary-foreground hover:text-white",
                                            ])}
                                            onClick={() => {
                                                field.onChange(seat);
                                                handleSeatClick(seat);
                                            }}
                                        >
                                            {seat}
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    <FormMessage className="!m-0 !mt-1 relative" />
                </FormItem>
            )}
        />
    );
};

export default BusSeatMap;

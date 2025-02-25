// import { onCreateTrip } from "@/api/services/trips-service"; // Assuming you have a service to create trips
import { onCreateTrip } from "@/api/services/trips-service";
import { cities } from "@/common";
import { ErrorResponse } from "@/interfaces";
import { mergeDateWithTime } from "@/lib/utils";
import { TripSchema, TripType } from "@/schemas/trip-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Combobox } from "../other/combobox";
import CustomInput from "../other/custom-input";
import Datepicker from "../other/datepicker";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

const CreateTripForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(TripSchema),
    });

    const onSubmit = async (data: TripType) => {
        try {
            // console.log(format(data.date, "PPP"), data);
            const payload = {
                ...data,
                date: data.date,
                departure_time: String(mergeDateWithTime(data.date, data.departure_time)),
                destination_time: (() => {
                    // Check if destination time is earlier than departure time (overnight travel)
                    const [depHours, depMinutes] = data.departure_time.split(":").map(Number);
                    const [destHours, destMinutes] = data.destination_time.split(":").map(Number);

                    const isOvernight = (destHours < depHours) ||
                        (destHours === depHours && destMinutes < depMinutes);

                    if (isOvernight) {
                        // Create next day date
                        const nextDay = new Date(data.date);
                        nextDay.setDate(nextDay.getDate() + 1);
                        return String(mergeDateWithTime(nextDay, data.destination_time));
                    } else {
                        return String(mergeDateWithTime(new Date(data.date), data.destination_time));
                    }
                })()
            };
            await onCreateTrip(payload);
            toast("You have successfully created a new trip!", {
                description: "The trip has been added to the system.",
                action: {
                    label: "Ok",
                    onClick: () => { },
                },
            });
            navigate("/dashboard/trips");
        } catch (error) {
            console.error("Trip creation failed:", error);

            const { response } = error as AxiosError<ErrorResponse>;
            const message = response?.data?.message! || "Something went wrong.";

            toast("Trip creation failed! Please try again.", {
                description: message,
                action: {
                    label: "Ok",
                    onClick: () => { },
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                <div className="border border-slate-200 rounded-md p-4">
                    <div className="flex flex-col gap-2 mb-6">
                        <h3 className="text-xl font-bold text-slate-700">Trip Details</h3>
                        <p className="text-slate-700 text-sm max-w-[400px]">
                            Provide the necessary details to create a new trip.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Combobox
                            label="Departure *"
                            data={cities}
                            form={form}
                            name="departure"
                        />
                        <Combobox
                            label="Destination *"
                            data={cities}
                            form={form}
                            name="destination"
                        />
                        <Datepicker label="Date of trip *" form={form} name="date" />

                        <div className="flex gap-4">
                            <CustomInput
                                name="departure_time"
                                form={form}
                                label="Departure Time *"
                                placeholder="Enter departure time (HH:MM)"
                            />
                            <CustomInput
                                name="destination_time"
                                form={form}
                                label="Arrival Time *"
                                placeholder="Enter destination time (HH:MM)"
                            />
                        </div>
                        <CustomInput
                            name="price"
                            form={form}
                            label="Price *"
                            placeholder="Enter price"
                            type="number"
                        />
                        <CustomInput
                            name="availableSeats"
                            form={form}
                            label="Available Seats *"
                            placeholder="Enter number of available seats"
                            type="number"
                        />
                    </div>
                    <Button className="w-full mt-8" type="submit">
                        Create Trip
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateTripForm;
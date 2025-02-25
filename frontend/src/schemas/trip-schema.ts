import { z } from 'zod';

export const TripSchema = z.object({
  departure: z.string({
    required_error: 'Departure location is required.',
  }),
  destination: z.string({
    required_error: 'Destination location is required.',
  }),
  date: z.date({
    required_error: 'Departure date is required.',
  }),
  departure_time: z
    .string({
      required_error: 'Departure time is required.',
    })
    .regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
      message: 'Departure time must be in HH:mm format.',
    }),
  destination_time: z
    .string({
      required_error: 'Destination time is required.',
    })
    .regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, {
      message: 'Destination time must be in HH:mm format.',
    }),
  price: z.number({
    required_error: 'Price is required.',
  }),
  availableSeats: z.number({
    required_error: 'Available seats is required.',
  }),
}).refine(data => data.departure !== data.destination, {
  message: 'Destination must be different from departure.',
  path: ['destination'], // This will attach the error to the destination field
});

export type TripType = z.infer<typeof TripSchema>;
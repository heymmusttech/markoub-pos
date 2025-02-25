import { z } from 'zod';

export const SearchSchema = z.object({
  departure: z
    .string({
      required_error: 'Departure is required.',
    })
    .min(1, 'Departure is required.'),
  destination: z
    .string({
      required_error: 'Destination is required.',
    })
    .min(1, 'Destination is required.'),
  date: z
    .date({
      required_error: 'Departure date is required.',
    }),
});

export type SearchType = z.infer<typeof SearchSchema>;

import { z } from "zod";

export const BookingSchema = z.object({
  seatNumber: z.number({
    required_error: "A seat number is required.",
  }),
  name: z.string({
    required_error: "A name is required.",
  }),
  phone: z
    .string({
      required_error: "A phone number is required.",
    })
    .regex(/^\+212[0-9]{9}$/, {
      message:
        "Phone number must be a valid Moroccan phone number in the format '+212XXXXXXXXX'.",
    }),
  email: z
    .string()
    .email({
      message: "Email must be a valid email address.",
    })
    .optional(), // Email is now optional instead of required
});

export type BookingType = z.infer<typeof BookingSchema>;

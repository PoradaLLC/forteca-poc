import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const CheckoutSchema = z.object({
  propertySlug: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  numGuests: z.number().positive(),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().optional(),
  specialRequests: z.string().optional(),
});

import { z } from "zod";

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD");

export const CheckoutSchema = z.object({
  propertySlug: z.string().min(1),
  checkIn: dateString,
  checkOut: dateString,
  numGuests: z.number().int().min(1).max(30),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().optional(),
  specialRequests: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export type ContactInput = z.infer<typeof ContactSchema>;

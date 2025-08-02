import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  phone: z.string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed")
});
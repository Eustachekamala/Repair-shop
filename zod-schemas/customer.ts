import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

import { z } from "zod";

export const inserCustomerSchema = createInsertSchema(customers, {
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address1: z.string().min(1, "Address is required"),
    address2: z.string().min(1, "optional"),
    city: z.string().min(1, "City is required"),
    state: z.string().length(2, "State must be exactly 2 characters"),
    email: z.string().email("Invalid email address"),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"),
    phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format. Use XXX-XXX-XXXX"),
    notes : z.string().min(1, "Notes is required")
})

export const selectCustomerSchema = createSelectSchema(customers)

export type inserCustomerSchemaType = typeof inserCustomerSchema._type
export type selectCustomerSchemaType = typeof selectCustomerSchema._type
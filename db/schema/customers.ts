import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  address1: text("address1").notNull(),
  address2: text("address1").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  email: text("email").notNull(),
  zip: text("zip").notNull(),
  phone: text("phone").notNull(),
  notes : text("notes").notNull()
});
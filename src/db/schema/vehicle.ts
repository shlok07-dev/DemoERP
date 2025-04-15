import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const vehicle = pgTable("vehicle", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type"),
  licensePlate: text("license_plate").notNull().unique(),
  driver: text("driver"),
  status: text("status"),
  lastMaintenance: timestamp("last_maintenance"),
  nextMaintenance: timestamp("next_maintenance"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

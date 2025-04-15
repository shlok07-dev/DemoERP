import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { vehicle } from "./vehicle";

export const maintenanceSchedule = pgTable("maintenance_schedule", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicle.id),
  scheduledDate: timestamp("scheduled_date"),
  description: text("description"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

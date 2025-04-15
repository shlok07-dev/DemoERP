import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { vehicle } from "./vehicle";

export const delivery = pgTable("delivery", {
  id: serial("id").primaryKey(),
  item: text("item").notNull(),
  origin: text("origin"),
  destination: text("destination"),
  vehicleId: integer("vehicle_id").references(() => vehicle.id),
  driver: text("driver"),
  departureDate: timestamp("departure_date"),
  estimatedArrival: timestamp("estimated_arrival"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { vehicle } from "./vehicle";

export const delivery = pgTable("delivery", {
  id: serial("id").primaryKey(),
  deliveryNo: text("delivery_no").notNull().unique(),
  item: text("item").notNull(),
  origin: text("origin"),
  destination: text("destination"),
  vehicleId: integer("vehicle_id").references(() => vehicle.id),
  driverId: integer("driver_id").references(() => users.id),
  departureDate: timestamp("departure_date"),
  estimatedArrival: timestamp("estimated_arrival"),
  actualArrival: timestamp("actual_arrival"),
  deliveryNotes: text("delivery_notes"),
  recipientName: text("recipient_name"),
  recipientContact: text("recipient_contact"),
  deliveryProof: text("delivery_proof"),
  status: text("status"), // 'scheduled', 'in-transit', 'delivered', 'cancelled'
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const deliveryRelations = relations(delivery, ({ one }) => ({
  vehicle: one(vehicle, {
    fields: [delivery.vehicleId],
    references: [vehicle.id],
  }),
  driver: one(users, {
    fields: [delivery.driverId],
    references: [users.id],
  }),
  createdBy: one(users, {
    fields: [delivery.createdById],
    references: [users.id],
  }),
}));

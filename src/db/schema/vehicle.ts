import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { delivery } from "./delivery";
import { maintenanceSchedule } from "./maintenanceSchedule";

// Vehicle and logistics management
export const vehicle = pgTable("vehicle", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type"),
  licensePlate: text("license_plate").notNull().unique(),
  driverId: integer("driver_id").references(() => users.id),
  status: text("status"), // 'active', 'maintenance', 'out-of-service'
  model: text("model"),
  year: text("year"),
  vin: text("vin"),
  insuranceProvider: text("insurance_provider"),
  insuranceExpiry: timestamp("insurance_expiry"),
  registrationExpiry: timestamp("registration_expiry"),
  lastMaintenance: timestamp("last_maintenance"),
  nextMaintenance: timestamp("next_maintenance"),
  fuelEfficiency: numeric("fuel_efficiency"),
  currentOdometer: numeric("current_odometer"),
  notes: text("notes"),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const vehicleRelations = relations(vehicle, ({ one, many }) => ({
  driver: one(users, {
    fields: [vehicle.driverId],
    references: [users.id],
  }),
  createdBy: one(users, {
    fields: [vehicle.createdById],
    references: [users.id],
  }),
  maintenanceSchedules: many(maintenanceSchedule),
  deliveries: many(delivery),
}));

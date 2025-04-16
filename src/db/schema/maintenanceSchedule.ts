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
import { vehicle } from "./vehicle";

export const maintenanceSchedule = pgTable("maintenance_schedule", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicle.id, {
    onDelete: "cascade",
  }),
  scheduledDate: timestamp("scheduled_date"),
  description: text("description"),
  maintenanceType: text("maintenance_type"), // 'oil change', 'tire rotation', etc.
  cost: numeric("cost"),
  vendor: text("vendor"), // Garage or service provider
  performedById: integer("performed_by_id").references(() => users.id),
  completionDate: timestamp("completion_date"),
  notes: text("notes"),
  status: text("status"), // 'scheduled', 'in-progress', 'completed', 'cancelled'
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const maintenanceScheduleRelations = relations(
  maintenanceSchedule,
  ({ one }) => ({
    vehicle: one(vehicle, {
      fields: [maintenanceSchedule.vehicleId],
      references: [vehicle.id],
    }),
    performedBy: one(users, {
      fields: [maintenanceSchedule.performedById],
      references: [users.id],
    }),
    createdBy: one(users, {
      fields: [maintenanceSchedule.createdById],
      references: [users.id],
    }),
  })
);

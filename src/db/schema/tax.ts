import {
  serial,
  text,
  timestamp,
  boolean,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const tax = pgTable("tax", {
  id: serial("id").primaryKey(),
  taxType: text("tax_type").notNull(),
  percentValue: numeric("percent_value"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdById: integer("created_by_id").references(() => users.id),
  updatedById: integer("updated_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const taxRelations = relations(tax, ({ one }) => ({
  createdBy: one(users, {
    fields: [tax.createdById],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [tax.updatedById],
    references: [users.id],
  }),
}));

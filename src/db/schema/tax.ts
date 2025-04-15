import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const tax = pgTable("tax", {
  id: serial("id").primaryKey(),
  taxType: text("tax_type").notNull(),
  percentValue: numeric("percent_value"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

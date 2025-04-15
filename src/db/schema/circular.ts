import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const circular = pgTable("circular", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sentFrom: text("sent_from"),
  sentTo: text("sent_to"),
  date: timestamp("date"),
  type: text("type"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

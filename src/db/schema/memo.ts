import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const memo = pgTable("memo", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sentFrom: text("sent_from"),
  sentTo: text("sent_to"),
  date: timestamp("date"),
  attachment: text("attachment"),
  type: text("type"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

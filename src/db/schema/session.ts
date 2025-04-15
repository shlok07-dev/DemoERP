import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "./user";

export const session = pgTable("session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => user.id),
  sessionToken: text("session_token").notNull().unique(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

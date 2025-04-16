import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const sessions = pgTable("session", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  sessionToken: text("session_token").notNull().unique(),
  expires: timestamp("expires").notNull(),
  ipAddress: text("ip_address"), // Track login IP for security
  userAgent: text("user_agent"), // Track device info
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

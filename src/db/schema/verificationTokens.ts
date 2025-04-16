import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable("verification_token", {
  id: serial("id").primaryKey(),
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { user } from "./user";

export const account = pgTable("account", {
  id: serial("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => user.id),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: text("session_state"),
});

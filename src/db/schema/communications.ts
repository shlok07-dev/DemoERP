import {
  serial,
  text,
  timestamp,
  boolean,
  pgTable,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

// Internal communications (memos, circulars, announcements)
export const communications = pgTable("communications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sentFromId: integer("sent_from_id").references(() => users.id),
  sentToId: integer("sent_to_id").references(() => users.id),
  type: text("type").notNull(), // 'memo', 'circular', 'announcement'
  priority: text("priority").default("normal"), // 'low', 'normal', 'high', 'urgent'
  date: timestamp("date"),
  attachment: text("attachment"),
  message: text("message"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const communicationsRelations = relations(communications, ({ one }) => ({
  sentFrom: one(users, {
    fields: [communications.sentFromId],
    references: [users.id],
    relationName: "sentFrom",
  }),
  sentTo: one(users, {
    fields: [communications.sentToId],
    references: [users.id],
    relationName: "sentTo",
  }),
}));

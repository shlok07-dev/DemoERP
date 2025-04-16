import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { inventory } from "./inventory";
import { users } from "./users";

// Inventory transaction history
export const inventoryTransactions = pgTable("inventory_transactions", {
  id: serial("id").primaryKey(),
  inventoryId: integer("inventory_id").references(() => inventory.id),
  transactionType: text("transaction_type").notNull(), // 'purchase', 'issue', 'return', 'adjustment'
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price"),
  totalAmount: numeric("total_amount"),
  date: timestamp("date").notNull(),
  referenceNumber: text("reference_number"),
  issuedTo: text("issued_to"), // Department or person receiving items
  notes: text("notes"),
  performedById: integer("performed_by_id").references(() => users.id),
  approvedById: integer("approved_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inventoryTransactionsRelations = relations(
  inventoryTransactions,
  ({ one }) => ({
    inventory: one(inventory, {
      fields: [inventoryTransactions.inventoryId],
      references: [inventory.id],
    }),
    performedBy: one(users, {
      fields: [inventoryTransactions.performedById],
      references: [users.id],
    }),
    approvedBy: one(users, {
      fields: [inventoryTransactions.approvedById],
      references: [users.id],
    }),
  })
);

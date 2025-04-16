import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { inventoryTransactions } from "./inventoryTransactions";
import { users } from "./users";

// Inventory management
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  productId: text("product_id").notNull().unique(),
  category: text("category"),
  qtyPurchased: integer("qty_purchased"),
  unitPrice: numeric("unit_price"),
  totalAmount: numeric("total_amount"),
  inStock: integer("in_stock"),
  supplier: text("supplier"),
  supplierContact: text("supplier_contact"), // Contact info for quick reference
  status: text("status"),
  minimumStockLevel: integer("minimum_stock_level"),
  reorderPoint: integer("reorder_point"),
  location: text("location"), // Storage location
  notes: text("notes"),
  lastCheckedById: integer("last_checked_by_id").references(() => users.id),
  lastCheckedDate: timestamp("last_checked_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inventoryRelations = relations(inventory, ({ many, one }) => ({
  transactions: many(inventoryTransactions),
  lastCheckedBy: one(users, {
    fields: [inventory.lastCheckedById],
    references: [users.id],
  }),
}));

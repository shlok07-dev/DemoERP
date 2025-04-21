// deletedInventory.ts
import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const deletedInventory = pgTable("deleted_inventory", {
  id: serial("id").primaryKey(), // ID of deleted inventory entry
  originalId: integer("original_id"), // Original inventory ID
  name: text("name"),
  productId: text("product_id"),
  category: text("category"),
  qtyPurchased: integer("qty_purchased"),
  unitPrice: numeric("unit_price"),
  totalAmount: numeric("total_amount"),
  inStock: integer("in_stock"),
  supplier: text("supplier"),
  supplierContact: text("supplier_contact"),
  status: text("status"),
  minimumStockLevel: integer("minimum_stock_level"),
  reorderPoint: integer("reorder_point"),
  location: text("location"),
  notes: text("notes"),
  lastCheckedById: integer("last_checked_by_id").references(() => users.id),
  lastCheckedDate: timestamp("last_checked_date"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),

  deletedById: integer("deleted_by_id").references(() => users.id),
  deletedAt: timestamp("deleted_at").defaultNow(),
});

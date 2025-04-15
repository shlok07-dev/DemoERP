import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";

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
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

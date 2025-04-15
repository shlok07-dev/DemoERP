import { pgTable, serial, text, integer, numeric } from "drizzle-orm/pg-core";

export const stock = pgTable("stock", {
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
});

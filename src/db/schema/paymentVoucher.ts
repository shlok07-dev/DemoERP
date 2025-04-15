import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const paymentVoucher = pgTable("payment_voucher", {
  id: serial("id").primaryKey(),
  date: timestamp("date"),
  payee: text("payee"),
  payeeAddress: text("payee_address"),
  paymentMethod: text("payment_method"),
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
  accountName: text("account_name"),
  amount: numeric("amount"),
  description: text("description"),
  category: text("category"),
  requestedBy: text("requested_by"),
  approvedBy: text("approved_by"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

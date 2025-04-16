import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { officeBudget } from "./officeBudget";

export const paymentVoucher = pgTable("payment_voucher", {
  id: serial("id").primaryKey(),
  voucherNo: text("voucher_no").notNull().unique(),
  date: timestamp("date"),
  payee: text("payee"),
  payeeAddress: text("payee_address"),
  paymentMethod: text("payment_method"), // 'cash', 'bank transfer', 'check'
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
  accountName: text("account_name"),
  amount: numeric("amount"),
  description: text("description"),
  category: text("category"),
  budgetId: integer("budget_id").references(() => officeBudget.id),
  receiptNumber: text("receipt_number"),
  invoiceNumber: text("invoice_number"),
  attachments: text("attachments"), // Could store file paths or URLs
  requestedById: integer("requested_by_id").references(() => users.id),
  approvedById: integer("approved_by_id").references(() => users.id),
  processedById: integer("processed_by_id").references(() => users.id),
  status: text("status"), // 'draft', 'pending', 'approved', 'rejected', 'paid'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const paymentVoucherRelations = relations(paymentVoucher, ({ one }) => ({
  budget: one(officeBudget, {
    fields: [paymentVoucher.budgetId],
    references: [officeBudget.id],
  }),
  requestedBy: one(users, {
    fields: [paymentVoucher.requestedById],
    references: [users.id],
    relationName: "requestedBy",
  }),
  approvedBy: one(users, {
    fields: [paymentVoucher.approvedById],
    references: [users.id],
    relationName: "approvedBy",
  }),
  processedBy: one(users, {
    fields: [paymentVoucher.processedById],
    references: [users.id],
  }),
}));

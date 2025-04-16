import {
  serial,
  text,
  timestamp,
  boolean,
  pgTable,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { paymentVoucher } from "./paymentVoucher";

// Finance management
export const officeBudget = pgTable("office_budget", {
  id: serial("id").primaryKey(),
  budgetNo: text("budget_no").notNull().unique(),
  fiscalYear: text("fiscal_year").notNull(),
  budgetDescription: text("budget_description"),
  budgetCategory: text("budget_category"),
  department: text("department"),
  budgetedAmount: numeric("budgeted_amount"),
  actualAmount: numeric("actual_amount"),
  variance: numeric("variance"),
  date: timestamp("date"),
  status: text("status").default("active"), // 'active', 'closed', 'suspended'
  notes: text("notes"),
  createdById: integer("created_by_id").references(() => users.id),
  approvedById: integer("approved_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const officeBudgetRelations = relations(
  officeBudget,
  ({ many, one }) => ({
    paymentVouchers: many(paymentVoucher),
    createdBy: one(users, {
      fields: [officeBudget.createdById],
      references: [users.id],
    }),
    approvedBy: one(users, {
      fields: [officeBudget.approvedById],
      references: [users.id],
    }),
  })
);

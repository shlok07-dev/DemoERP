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

// Staff payroll management
export const payroll = pgTable("payroll", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  staffName: text("staff_name").notNull(),
  title: text("title"),
  level: text("level"),
  basicSalary: numeric("basic_salary"),
  housingAllowance: numeric("housing_allowance"),
  transportAllowance: numeric("transport_allowance"),
  utilityAllowance: numeric("utility_allowance"),
  productivityAllowance: numeric("productivity_allowance"),
  communicationAllowance: numeric("communication_allowance"),
  inconvenienceAllowance: numeric("inconvenience_allowance"),
  grossSalary: numeric("gross_salary"),
  taxPaye: numeric("tax_paye"),
  employeePension: numeric("employee_pension"),
  totalDeduction: numeric("total_deduction"),
  netSalary: numeric("net_salary"),
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
  paymentDate: timestamp("payment_date"),
  paymentStatus: text("payment_status").default("pending"), // 'pending', 'processed', 'completed'
  paymentReference: text("payment_reference"),
  payrollPeriod: text("payroll_period"), // 'January 2025', etc.
  processedById: integer("processed_by_id").references(() => users.id),
  approvedById: integer("approved_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payrollRelations = relations(payroll, ({ one }) => ({
  user: one(users, {
    fields: [payroll.userId],
    references: [users.id],
    relationName: "payroll_user", // custom relationName
  }),
  processedBy: one(users, {
    fields: [payroll.processedById],
    references: [users.id],
    relationName: "payroll_processed_by",
  }),
  approvedBy: one(users, {
    fields: [payroll.approvedById],
    references: [users.id],
    relationName: "payroll_approved_by",
  }),
}));

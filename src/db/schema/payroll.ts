import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const payroll = pgTable("payroll", {
  id: serial("id").primaryKey(),
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

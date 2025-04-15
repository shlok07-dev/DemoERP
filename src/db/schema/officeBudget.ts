import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const officeBudget = pgTable("office_budget", {
  id: serial("id").primaryKey(),
  budgetNo: text("budget_no").notNull().unique(),
  budgetDescription: text("budget_description"),
  budgetedAmount: numeric("budgeted_amount"),
  actualAmount: numeric("actual_amount"),
  variance: numeric("variance"),
  date: timestamp("date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

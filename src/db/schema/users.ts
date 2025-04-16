import { serial, text, timestamp, boolean, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { accounts } from "./accounts";
import { sessions } from "./sessions";
import { payroll } from "./payroll";
import { paymentVoucher } from "./paymentVoucher";
import { communications } from "./communications";

// Admin user table
export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  position: text("position"), // Job position in the organization
  department: text("department"), // Department they belong to
  isActive: boolean("is_active").default(true), // For disabling accounts without deleting
  lastLogin: timestamp("last_login"),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  payrolls: many(payroll, { relationName: "payroll_user" }),
  processedPayrolls: many(payroll, { relationName: "payroll_processed_by" }),
  approvedPayrolls: many(payroll, { relationName: "payroll_approved_by" }),
  requestedVouchers: many(paymentVoucher, { relationName: "requestedBy" }),
  approvedVouchers: many(paymentVoucher, { relationName: "approvedBy" }),
  sentMemos: many(communications, { relationName: "sentFrom" }),
  receivedMemos: many(communications, { relationName: "sentTo" }),
}));

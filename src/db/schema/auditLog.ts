import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

// Comprehensive audit log to track all changes to any table
export const auditLog = pgTable("audit_log", {
  id: serial("id").primaryKey(),

  // User who performed the action
  userId: integer("user_id").references(() => users.id),

  // Action information
  action: text("action").notNull(), // 'create', 'update', 'delete'
  tableName: text("table_name").notNull(), // Name of the affected table
  recordId: text("record_id").notNull(), // Primary key of the affected record

  // Data snapshots
  oldData: jsonb("old_data"), // Previous state (null for create)
  newData: jsonb("new_data"), // New state (null for delete)

  // Change details
  changedFields: jsonb("changed_fields"), // Object containing only modified fields for updates

  // Metadata
  ipAddress: text("ip_address"), // IP address of the user who made the change
  userAgent: text("user_agent"), // Browser/client information
  timestamp: timestamp("timestamp").defaultNow().notNull(),

  // Additional context
  reason: text("reason"), // Optional reason for change (useful for approvals/reviews)
  requestId: text("request_id"), // To group related changes in a single transaction
});

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  user: one(users, {
    fields: [auditLog.userId],
    references: [users.id],
  }),
}));

// Helper types for tracking changes
export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "restore"
  | "login"
  | "logout";

// Example function to log audit events
export const createAuditLog = async (
  db: any, // Your database instance
  userId: number,
  action: AuditAction,
  tableName: string,
  recordId: string | number,
  oldData: any = null,
  newData: any = null,
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    reason?: string;
    requestId?: string;
  } = {}
) => {
  // For updates, calculate which fields actually changed
  let changedFields: { [key: string]: { from: any; to: any } } | null = null;
  if (action === "update" && oldData && newData) {
    changedFields = {};
    for (const key in newData) {
      if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
        changedFields[key] = {
          from: oldData[key],
          to: newData[key],
        };
      }
    }
  }

  // Insert audit log entry
  return db.insert(auditLog).values({
    userId,
    action,
    tableName,
    recordId: recordId.toString(),
    oldData,
    newData,
    changedFields,
    ipAddress: metadata.ipAddress,
    userAgent: metadata.userAgent,
    reason: metadata.reason,
    requestId: metadata.requestId,
  });
};

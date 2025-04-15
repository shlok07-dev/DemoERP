CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "circular" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"sent_from" text,
	"sent_to" text,
	"date" timestamp,
	"type" text,
	"message" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "delivery" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" text NOT NULL,
	"origin" text,
	"destination" text,
	"vehicle_id" integer,
	"driver" text,
	"departure_date" timestamp,
	"estimated_arrival" timestamp,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text,
	"two_factor_enabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"session_token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "session_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "verification_token" (
	"id" serial PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "verification_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"product_id" text NOT NULL,
	"category" text,
	"qty_purchased" integer,
	"unit_price" numeric,
	"total_amount" numeric,
	"in_stock" integer,
	"supplier" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "inventory_product_id_unique" UNIQUE("product_id")
);
--> statement-breakpoint
CREATE TABLE "payroll" (
	"id" serial PRIMARY KEY NOT NULL,
	"staff_name" text NOT NULL,
	"title" text,
	"level" text,
	"basic_salary" numeric,
	"housing_allowance" numeric,
	"transport_allowance" numeric,
	"utility_allowance" numeric,
	"productivity_allowance" numeric,
	"communication_allowance" numeric,
	"inconvenience_allowance" numeric,
	"gross_salary" numeric,
	"tax_paye" numeric,
	"employee_pension" numeric,
	"total_deduction" numeric,
	"net_salary" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "office_budget" (
	"id" serial PRIMARY KEY NOT NULL,
	"budget_no" text NOT NULL,
	"budget_description" text,
	"budgeted_amount" numeric,
	"actual_amount" numeric,
	"variance" numeric,
	"date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "office_budget_budget_no_unique" UNIQUE("budget_no")
);
--> statement-breakpoint
CREATE TABLE "memo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"sent_from" text,
	"sent_to" text,
	"date" timestamp,
	"attachment" text,
	"type" text,
	"message" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payment_voucher" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp,
	"payee" text,
	"payee_address" text,
	"payment_method" text,
	"bank_name" text,
	"account_number" text,
	"account_name" text,
	"amount" numeric,
	"description" text,
	"category" text,
	"requested_by" text,
	"approved_by" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stock" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"product_id" text NOT NULL,
	"category" text,
	"qty_purchased" integer,
	"unit_price" numeric,
	"total_amount" numeric,
	"in_stock" integer,
	"supplier" text,
	"status" text,
	CONSTRAINT "stock_product_id_unique" UNIQUE("product_id")
);
--> statement-breakpoint
CREATE TABLE "tax" (
	"id" serial PRIMARY KEY NOT NULL,
	"tax_type" text NOT NULL,
	"percent_value" numeric,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vehicle" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text,
	"license_plate" text NOT NULL,
	"driver" text,
	"status" text,
	"last_maintenance" timestamp,
	"next_maintenance" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "vehicle_license_plate_unique" UNIQUE("license_plate")
);
--> statement-breakpoint
CREATE TABLE "maintenance_schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"scheduled_date" timestamp,
	"description" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_vehicle_id_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_schedule" ADD CONSTRAINT "maintenance_schedule_vehicle_id_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id") ON DELETE no action ON UPDATE no action;
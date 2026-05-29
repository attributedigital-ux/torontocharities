CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "charities" (
	"id" serial PRIMARY KEY NOT NULL,
	"cra_charity_number" text NOT NULL,
	"legal_name" text NOT NULL,
	"display_name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"description_source" text,
	"address_street" text,
	"address_city" text,
	"address_postcode" text,
	"cra_designation" text,
	"website_url" text,
	"email" text,
	"phone" text,
	"status" text DEFAULT 'published' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"claimed_at" timestamp,
	"claimed_by_user_id" integer,
	"linkback_verified_at" timestamp,
	"last_verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "charities_cra_charity_number_unique" UNIQUE("cra_charity_number"),
	CONSTRAINT "charities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "charity_categories" (
	"charity_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	CONSTRAINT "charity_categories_charity_id_category_id_pk" PRIMARY KEY("charity_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "charity_claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"charity_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"claim_token" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"linkback_url" text,
	"linkback_verified_at" timestamp,
	"claimed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "charity_claims_claim_token_unique" UNIQUE("claim_token")
);
--> statement-breakpoint
CREATE TABLE "event_source_opt_outs" (
	"id" serial PRIMARY KEY NOT NULL,
	"charity_id" integer NOT NULL,
	"opted_out_at" timestamp DEFAULT now() NOT NULL,
	"reason" text,
	CONSTRAINT "event_source_opt_outs_charity_id_unique" UNIQUE("charity_id")
);
--> statement-breakpoint
CREATE TABLE "event_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"charity_id" integer,
	"source_type" text NOT NULL,
	"source_url" text NOT NULL,
	"source_name" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_checked_at" timestamp,
	"last_success_at" timestamp,
	"last_error" text,
	"consecutive_failures" integer DEFAULT 0 NOT NULL,
	"events_found_count" integer DEFAULT 0 NOT NULL,
	"events_approved_count" integer DEFAULT 0 NOT NULL,
	"config" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"charity_id" integer,
	"title" text NOT NULL,
	"description" text,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp,
	"location_name" text,
	"location_address" text,
	"registration_url" text,
	"cost_text" text,
	"image_url" text,
	"source_url" text,
	"source_type" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"approved_at" timestamp,
	"approved_by" text,
	"confidence_score" numeric(3, 2),
	"category_hints" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "guides" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"path" text NOT NULL,
	"title" text NOT NULL,
	"dek" text,
	"content" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "guides_slug_unique" UNIQUE("slug"),
	CONSTRAINT "guides_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE "raw_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_id" integer,
	"source_url" text,
	"external_id" text,
	"raw_payload" jsonb NOT NULL,
	"charity_id" integer,
	"processed_at" timestamp,
	"processed_status" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"role" text DEFAULT 'charity_owner' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charity_categories" ADD CONSTRAINT "charity_categories_charity_id_charities_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charity_categories" ADD CONSTRAINT "charity_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charity_claims" ADD CONSTRAINT "charity_claims_charity_id_charities_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charity_claims" ADD CONSTRAINT "charity_claims_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_source_opt_outs" ADD CONSTRAINT "event_source_opt_outs_charity_id_charities_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_sources" ADD CONSTRAINT "event_sources_charity_id_charities_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_charity_id_charities_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw_events" ADD CONSTRAINT "raw_events_source_id_event_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."event_sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "raw_events" ADD CONSTRAINT "raw_events_charity_id_charities_id_fk" FOREIGN KEY ("charity_id") REFERENCES "public"."charities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "charities_status_idx" ON "charities" USING btree ("status");--> statement-breakpoint
CREATE INDEX "charities_is_featured_idx" ON "charities" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "event_sources_is_active_idx" ON "event_sources" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "event_sources_charity_id_idx" ON "event_sources" USING btree ("charity_id");--> statement-breakpoint
CREATE INDEX "events_charity_id_idx" ON "events" USING btree ("charity_id");--> statement-breakpoint
CREATE INDEX "events_starts_at_idx" ON "events" USING btree ("starts_at");--> statement-breakpoint
CREATE INDEX "events_status_idx" ON "events" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "raw_events_dedup_idx" ON "raw_events" USING btree ("source_id","external_id") WHERE "raw_events"."external_id" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "raw_events_pending_idx" ON "raw_events" USING btree ("processed_status") WHERE "raw_events"."processed_status" = 'pending';
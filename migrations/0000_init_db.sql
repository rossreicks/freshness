CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"type" text,
	"icon_path" text,
	"icon_link" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"oid" text NOT NULL,
	"step_id" integer NOT NULL,
	"link" text NOT NULL,
	"path" text NOT NULL,
	"caption" text NOT NULL,
	CONSTRAINT "images_oid_unique" UNIQUE("oid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"oid" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "ingredients_oid_unique" UNIQUE("oid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"oid" text NOT NULL,
	"category_id" integer NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"headline" text,
	"description" text,
	"difficulty" text,
	"prep_time" text,
	"total_time" text,
	"image_path" text,
	"card_link" text,
	"average_rating" text,
	"ratings_count" text,
	"favorites_count" text,
	"is_premium" text,
	"website_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "recipes_oid_unique" UNIQUE("oid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"oid" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"index" integer NOT NULL,
	"instructions" text NOT NULL,
	CONSTRAINT "steps_oid_unique" UNIQUE("oid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timers" (
	"id" serial PRIMARY KEY NOT NULL,
	"oid" text NOT NULL,
	"step_id" integer NOT NULL,
	"name" text NOT NULL,
	"duration" text,
	"temperature" text,
	"temperature_unit" text,
	"oven_mode" text,
	CONSTRAINT "timers_oid_unique" UNIQUE("oid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "utensils" (
	"id" serial PRIMARY KEY NOT NULL,
	"oid" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "utensils_oid_unique" UNIQUE("oid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timers" ADD CONSTRAINT "timers_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "utensils" ADD CONSTRAINT "utensils_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

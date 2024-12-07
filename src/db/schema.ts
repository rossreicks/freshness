import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("category", {
	id: serial("id").primaryKey(),
    slug: text("slug").unique().notNull(),
	name: text("name").notNull(),
    type: text("type"),
    icon_path: text("icon_path"),
    icon_link: text("icon_link"),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
});

export const recipes = pgTable("recipes", {
	id: serial("id").primaryKey(),
    oid: text("oid").unique().notNull(),
	category_id: integer("category_id")
		.notNull()
		.references(() => categories.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	headline: text("headline"),
	description: text("description"),
	difficulty: text("difficulty"),
	prep_time: text("prep_time"),
	total_time: text("total_time"),
	image_path: text("image_path"),
	card_link: text("card_link"),
	average_rating: text("average_rating"),
	ratings_count: text("ratings_count"),
	favorites_count: text("favorites_count"),
	is_premium: text("is_premium"),
	website_url: text("website_url"),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const ingredients = pgTable("ingredients", {
	id: serial("id").primaryKey(),
    oid: text("oid").unique().notNull(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipes.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const utensils = pgTable("utensils", {
	id: serial("id").primaryKey(),
    oid: text("oid").unique().notNull(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipes.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const steps = pgTable("steps", {
	id: serial("id").primaryKey(),
    oid: text("oid").unique().notNull(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipes.id, { onDelete: "cascade" }),
	index: integer("index").notNull(),
	instructions: text("instructions").notNull(),
});

export const images = pgTable("images", {
	id: serial("id").primaryKey(),
    oid: text("oid").unique().notNull(),
	step_id: integer("step_id")
		.notNull()
		.references(() => steps.id, { onDelete: "cascade" }),
	link: text("link"),
	path: text("path"),
	caption: text("caption")
});

export const timers = pgTable("timers", {
	id: serial("id").primaryKey(),
    oid: text("oid").unique().notNull(),
	step_id: integer("step_id")
		.notNull()
		.references(() => steps.id, { onDelete: "cascade" }),
	name: text("name"),
	duration: text("duration"),
	temperature: text("temperature"),
	temperature_unit: text("temperature_unit"),
	oven_mode: text("oven_mode"),
});

export type SelectRecipe = typeof recipes.$inferSelect;

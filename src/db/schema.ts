import { sql } from "drizzle-orm/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("category", {
	id: integer("id").primaryKey(),
	slug: text("slug").unique().notNull(),
	name: text("name").notNull(),
	type: text("type"),
	icon_path: text("icon_path"),
	icon_link: text("icon_link"),
	created_at: text("created_at")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	updated_at: text("updated_at")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const recipes = sqliteTable("recipes", {
	id: integer("id").primaryKey(),
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
	created_at: text("created_at")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	updated_at: text("updated_at")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const ingredients = sqliteTable("ingredients", {
	id: integer("id").primaryKey(),
	oid: text("oid").unique().notNull(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipes.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const utensils = sqliteTable("utensils", {
	id: integer("id").primaryKey(),
	oid: text("oid").unique().notNull(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipes.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const steps = sqliteTable("steps", {
	id: integer("id").primaryKey(),
	oid: text("oid").unique().notNull(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipes.id, { onDelete: "cascade" }),
	index: integer("index").notNull(),
	instructions: text("instructions").notNull(),
});

export const images = sqliteTable("images", {
	id: integer("id").primaryKey(),
	oid: text("oid").unique().notNull(),
	step_id: integer("step_id")
		.notNull()
		.references(() => steps.id, { onDelete: "cascade" }),
	link: text("link"),
	path: text("path"),
	caption: text("caption"),
});

export const timers = sqliteTable("timers", {
	id: integer("id").primaryKey(),
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

// Adjust this based on your usage
export type SelectRecipe = typeof recipes.$inferSelect;

import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
	id: serial("id").primaryKey(),
	name: text("name"),
});

export const recipesTable = pgTable("recipes", {
	id: serial("id").primaryKey(),
	category_id: integer("category_id")
		.notNull()
		.references(() => categoryTable.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
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

export const ingredientsTable = pgTable("ingredients", {
	id: serial("id").primaryKey(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipesTable.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const utensilsTable = pgTable("utensils", {
	id: serial("id").primaryKey(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipesTable.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
});

export const stepsTable = pgTable("steps", {
	id: serial("id").primaryKey(),
	recipe_id: integer("recipe_id")
		.notNull()
		.references(() => recipesTable.id, { onDelete: "cascade" }),
	index: integer("index").notNull(),
	instructions: text("instructions").notNull(),
});

export const imagesTable = pgTable("images", {
	id: serial("id").primaryKey(),
	step_id: integer("step_id")
		.notNull()
		.references(() => stepsTable.id, { onDelete: "cascade" }),
	link: text("link").notNull(),
	path: text("path").notNull(),
	caption: text("caption").notNull(),
});

export const timersTable = pgTable("timers", {
	id: serial("id").primaryKey(),
	step_id: integer("step_id")
		.notNull()
		.references(() => stepsTable.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	duration: text("duration").notNull(),
	temperature: text("temperature").notNull(),
	temperature_unit: text("temperature_unit").notNull(),
	oven_mode: text("oven_mode").notNull(),
});

export type SelectRecipe = typeof recipesTable.$inferSelect;

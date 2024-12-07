import { createServerFn } from "@tanstack/start";
import pino from "pino";
import { db } from "@src/db/client";
import { sql } from "drizzle-orm";
import {
	categories,
	images,
	ingredients,
	recipes,
	steps,
	timers,
	utensils,
} from "@src/db/schema";
import { eq } from "drizzle-orm";
import type { Recipes, Step } from "@types/recipes";

const logger = pino();

export const fetchRandomRecipe = createServerFn({ method: "GET" }).handler(
	async () => {
		logger.info("fetching random recipe");

		const randomRecipe = await db
			.select({ id: recipes.id })
			.from(recipes)
			.where(
				sql`(SELECT COUNT(*) FROM ingredients WHERE ingredients.recipe_id = recipes.id) > 3`
			)
			.orderBy(sql`RANDOM()`)
			.limit(1);

		const recipeId = randomRecipe[0].id;

		const recipeDetails = await db
			.select()
			.from(recipes)
			.leftJoin(categories, eq(recipes.category_id, categories.id))
			.leftJoin(steps, eq(recipes.id, steps.recipe_id))
			.leftJoin(ingredients, eq(ingredients.recipe_id, recipes.id))
			.leftJoin(utensils, eq(utensils.recipe_id, recipes.id))
			.where(eq(recipes.id, recipeId));

		const stepsArray = recipeDetails.map((r) => r.steps?.instructions);
		const ingredientsArray = recipeDetails.map((r) => r.ingredients?.name);

		const stepsSet = new Set(stepsArray.filter((x) => x !== undefined));
		const ingredientsSet = new Set(
			ingredientsArray.filter((x) => x !== undefined)
		);

		const recipe: Partial<Recipes> = {
			...recipeDetails[0].recipes,
			id: undefined,
			steps: Array.from(stepsSet),
			ingredients: Array.from(ingredientsSet),
		};

		return recipe;
	}
);

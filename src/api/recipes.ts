import { Hono } from "hono";
import { db, client } from "../db/client";
import {
	categories,
	images,
	ingredients,
	recipes,
	steps,
	timers,
	utensils,
} from "../db/schema";
import { eq } from "drizzle-orm";
import type { Image, Recipes, Step } from "../../types/recipes";

const app = new Hono();

app.get("/random", async (c) => {
	// return a random recipe

	// random number between 0 and 7000

	const random = Math.floor(Math.random() * 7000);

	const result = await db
		.select()
		.from(recipes)
		.leftJoin(categories, eq(recipes.category_id, categories.id))
		.leftJoin(steps, eq(recipes.id, steps.recipe_id))
		.leftJoin(timers, eq(steps.id, timers.step_id))
		.leftJoin(images, eq(steps.id, images.step_id))
		.leftJoin(ingredients, eq(ingredients.recipe_id, recipes.id))
		.leftJoin(utensils, eq(utensils.recipe_id, recipes.id))
		.where(eq(recipes.id, random));

	const recipe: Partial<Recipes> = {
		...result[0].recipes,
		id: undefined,
        steps: [],
	};
	const mappedSteps = result
		.map((r) => {
            const steps = r.steps;

            if (!steps) return null;

            const timers = result.filter((x) => x.timers !== null && x.timers?.step_id === steps.id) as Timer[];
            const images = result.filter((x) => x.timers !== null && x.images?.step_id === steps.id);

			return {
				...r.steps,
                index: steps.index.toString(),
				timers,
                images,
			};
		});

    recipe.steps = mappedSteps.filter((x) => x !== null) as Step[];

	return c.json(recipe);
});

export default app;

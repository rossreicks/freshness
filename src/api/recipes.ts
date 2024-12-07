import { Hono } from "hono";
import { db } from "../db/client";
import { sql } from "drizzle-orm";
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

	const result = await db
		.select()
		.from(recipes)
		.leftJoin(categories, eq(recipes.category_id, categories.id))
		.leftJoin(steps, eq(recipes.id, steps.recipe_id))
		.leftJoin(timers, eq(steps.id, timers.step_id))
		.leftJoin(images, eq(steps.id, images.step_id))
		.leftJoin(ingredients, eq(ingredients.recipe_id, recipes.id))
		.leftJoin(utensils, eq(utensils.recipe_id, recipes.id))
        .where(
            sql`(SELECT COUNT(*) FROM ingredients WHERE ingredients.recipe_id = recipes.id) > 3`
        )
        .orderBy(sql`RANDOM()`)
        .limit(1);

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

app.get('/', async (c) => {
    const result = await db
        .select()
        .from(recipes)
        .leftJoin(categories, eq(recipes.category_id, categories.id))
        .leftJoin(steps, eq(recipes.id, steps.recipe_id))
        .leftJoin(timers, eq(steps.id, timers.step_id))
        .leftJoin(images, eq(steps.id, images.step_id))
        .leftJoin(ingredients, eq(ingredients.recipe_id, recipes.id))
        .leftJoin(utensils, eq(utensils.recipe_id, recipes.id))
        // where there are at least 3 ingredients
        .groupBy(recipes.id)
        .having(sql`"COUNT(ingredients.id) > 3"`)
        .limit(10);

    const recipe: Partial<Recipes> = {
        ...result[0].recipes,
        id: undefined,
        steps: [],
        headline: undefined,
        description: undefined,
    };
    // const mappedSteps = result
    //     .map((r) => {
    //         const steps = r.steps;

    //         if (!steps) return null;

    //         const timers = result.filter((x) => x.timers !== null && x.timers?.step_id === steps.id) as Timer[];
    //         const images = result.filter((x) => x.timers !== null && x.images?.step_id === steps.id);

    //         return {
    //             ...r.steps,
    //             index: steps.index.toString(),
    //             timers,
    //             images,
    //         };
    //     });

    // recipe.steps = mappedSteps.filter((x) => x !== null) as Step[];

    return c.json(recipe);
})

export default app;

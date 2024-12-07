import recipesJSON from "../lib/recipes.json" assert { type: "json" };
import type { Recipes } from "../types/recipes";
import { client, db } from './db/client';
import * as schema from "./db/schema";

const recipes = recipesJSON as unknown as Recipes[];

try {
	for (let i = 1500; i < recipes.length; i++) {
        const recipe = recipes[i];

		if (i % 100 === 0) console.log(`${i} recipes added`);

		const { category, ingredients, utensils, steps, ...recipeData } = recipe;

		const categoryIds = await db
			.insert(schema.categories)
			.values({ ...category })
			.onConflictDoUpdate({
				target: schema.categories.slug,
				set: { updated_at: new Date() },
			})
			.returning({ id: schema.categories.id });

		const category_id = categoryIds[0].id;

		const recipeIds = await db
			.insert(schema.recipes)
			.values({ ...recipe, id: undefined, category_id, oid: recipe._id.$oid })
            .onConflictDoUpdate({
                target: schema.recipes.oid,
                set: { updated_at: new Date() },
            })
			.returning({ id: schema.recipes.id });

		const recipe_id = recipeIds[0].id;

		if (ingredients.length > 0) {
			await db.insert(schema.ingredients).values(
				ingredients.map((i) => ({
					...i,
					id: undefined,
					recipe_id,
					oid: i._id.$oid,
				})),
			).onConflictDoNothing({ target: schema.ingredients.oid });
		}

		if (utensils.length > 0) {
			await db.insert(schema.utensils).values(
				utensils.map((u) => ({
					...u,
					id: undefined,
					recipe_id,
					oid: u._id.$oid,
				})),
			).onConflictDoNothing({ target: schema.utensils.oid });
		}

		for (const step of steps) {
			const { images, timers, ...stepData } = step;

			const stepIds = await db
				.insert(schema.steps)
				.values({
					...stepData,
					id: undefined,
					recipe_id,
					oid: step._id.$oid,
					index: Number.parseInt(step.index),
				})
                .onConflictDoUpdate({
                    target: schema.steps.oid,
                    set: { recipe_id },
                })
				.returning({ id: schema.steps.id });

			const step_id = stepIds[0].id;

			if (images.length > 0) {
				await db
					.insert(schema.images)
					.values(
						images.map((i) => ({
							...i,
							id: undefined,
							step_id,
							oid: i._id.$oid,
						})),
					).onConflictDoNothing({ target: schema.images.oid });
			}

			if (timers.length > 0) {
				await db
					.insert(schema.timers)
					.values(
						timers.map((t) => ({
							...t,
							id: undefined,
							step_id,
							oid: t._id.$oid,
							temperature_unit: t.temperatureUnit,
							oven_mode: t.ovenMode,
						})),
					).onConflictDoNothing({ target: schema.timers.oid });
			}
		}
	}
} finally {
	client.end();
}

// const recipesToAdd: Record<string, Omit<Recipes, 'ingredients' | 'category' | 'utensils' | 'steps'>> = {};
// const categoriesToAdd: Record<string, Recipes['category']> = {};
// const ingredientsToAdd: Record<string, Recipes['ingredients'][number]> = {};
// const utensilsToAdd: Record<string, Recipes['utensils'][number]> = {};
// const stepsToAdd: Record<string, Omit<Recipes['steps'][number], 'images' | 'timers'>> = {};
// const imagesToAdd: Record<string, Recipes['steps'][number]['images'][number]> = {};
// const timersToAdd: Record<string, Recipes['steps'][number]['timers'][number]> = {};

// for (const recipe of recipes) {
//     const { category, ingredients, utensils, steps, ...recipeData } = recipe;

//     if (!categoriesToAdd[category.slug]) {
//         categoriesToAdd[category.slug] = category;
//     }

//     for (const ingredient of ingredients) {
//         if (!ingredientsToAdd[ingredient.slug]) {
//             ingredientsToAdd[ingredient.slug] = ingredient;
//         }
//     }

//     for (const utensil of utensils) {
//         if (!utensilsToAdd[utensil._id.$oid]) {
//             utensilsToAdd[utensil._id.$oid] = utensil;
//         }
//     }

//     for (const step of steps) {
//         const { images, timers, ...stepData } = step;

//         if (!stepsToAdd[step._id.$oid]) {
//             stepsToAdd[step._id.$oid] = stepData;
//         }

//         for (const image of images) {
//             if (!imagesToAdd[image._id.$oid]) {
//                 imagesToAdd[image._id.$oid] = image;
//             }
//         }

//         for (const timer of timers) {
//             if (!timersToAdd[timer._id.$oid]) {
//                 timersToAdd[timer._id.$oid] = timer;
//             }
//         }
//     }

//     recipesToAdd[recipeData.slug] = recipeData;
// }

// // Insert categories, need to keep track of the ids for foreign key constraints
// const cateegories = await db.insert(schema.categories).values(Object.values(categoriesToAdd)).returning({ id: schema.categories.id });

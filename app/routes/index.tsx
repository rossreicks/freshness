import { createFileRoute, useRouter } from '@tanstack/react-router'
import { fetchRandomRecipe } from '../services/recipes.service'
import RecipeDisplay from '@/components/recipe'

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await fetchRandomRecipe(),
})

function Home() {
    const state = Route.useLoaderData()

    return (
        <div>
            <RecipeDisplay recipe={state} />
        </div>
    )
}

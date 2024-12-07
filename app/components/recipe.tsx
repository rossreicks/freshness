import { Star, Clock, ChefHat, Users, Heart, Utensils } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface RecipeProps {
    recipe: {
        name: string
        headline: string
        card_link: string
        average_rating: string
        prep_time: string
        ingredients: string[]
        steps: string[]
        favorites_count: string
        ratings_count: string
        difficulty: string
        is_premium: string
        description: string
    }
}

const formatNumberWithThousandSeparator = (number: string) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function RecipeDisplay({ recipe }: RecipeProps) {
    const difficultyMap: { [key: string]: string } = {
        '1': 'Easy',
        '2': 'Medium',
        '3': 'Hard'
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{recipe.name}</CardTitle>
                    <CardDescription className="text-lg">{recipe.headline}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-400 mr-2" />
                            <span>{recipe.average_rating} ({formatNumberWithThousandSeparator(recipe.ratings_count)} ratings)</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 text-blue-500 mr-2" />
                            <span>Prep: {recipe.prep_time.replace('PT', '').replace('M', ' min')}</span>
                        </div>
                        <div className="flex items-center">
                            <ChefHat className="w-5 h-5 text-green-500 mr-2" />
                            <span>{recipe.ingredients.length} ingredients</span>
                        </div>
                        <div className="flex items-center">
                            <Heart className="w-5 h-5 text-red-500 mr-2" />
                            <span>{recipe.favorites_count} favorites</span>
                        </div>
                        <div className="flex items-center">
                            <Utensils className="w-5 h-5 text-purple-500 mr-2" />
                            <span>{recipe.steps.length} steps</span>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-6">
                        <Badge variant="secondary">{difficultyMap[recipe.difficulty] || 'Unknown'} Difficulty</Badge>
                        {recipe.is_premium === 'true' && <Badge variant="destructive">Premium</Badge>}
                    </div>

                    <p className="mb-6 text-gray-700">{recipe.description}</p>

                    <Button asChild className="w-full mb-6">
                        <a href={recipe.card_link} target="_blank" rel="noopener noreferrer">
                            View Full Recipe Card
                        </a>
                    </Button>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="ingredients">
                            <AccordionTrigger>Ingredients</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc pl-5">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index} className="mb-2">{ingredient}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="steps">
                            <AccordionTrigger>Cooking Steps</AccordionTrigger>
                            <AccordionContent>
                                <ol className="list-decimal pl-5">
                                    {recipe.steps.map((step, index) => (
                                        <li key={index} className="mb-4">{step}</li>
                                    ))}
                                </ol>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}


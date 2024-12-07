export interface Recipes {
    category: Category;
    name: string;
    id: string;
    slug: string;
    headline: string | null;
    description: string | null;
    difficulty: string | null;
    prepTime: string | null;
    totalTime: string | null;
    imagePath: string | null;
    cardLink: string | null;
    averageRating: string | null;
    ratingsCount: string | null;
    favoritesCount: string | null;
    isPremium: string | null;
    websiteUrl: string | null;
    createdAt: string;
    updatedAt: string;
    ingredients: Ingredient[];
    utensils: Utensil[];
    steps: Step[];
    __v: number;
  }

  interface Step {
    index: string;
    instructions: string;
    timers: Timer[];
    images: Image[];
  }

  interface Image {
    link: string;
    path: string;
    caption: string;
  }

  interface Timer {
    name: string;
    duration: string;
    temperature: string;
    temperatureUnit: string;
    ovenMode: string;
  }

  interface Utensil {
    id: string;
    type: string;
    name: string;
  }

  interface Ingredient {
    name: string;
    slug: string;
    imagePath: string;
  }

  interface Category {
    type: string;
    name: string;
    slug: string;
    iconLink: string;
    iconPath: string;
  }

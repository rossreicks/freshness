interface oid {
	$oid: string;
}

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
	ingredients: string[];
	utensils: Utensil[];
	steps: string[];
	__v: number;
	_id: oid;
}

interface Step {
	index: string;
	instructions: string;
	timers: Timer[];
	images: Image[];
	_id?: oid;
}

interface Image {
	link: string;
	path: string;
	caption: string;
	_id: oid;
}

interface Timer {
	name: string;
	duration: string;
	temperature: string;
	temperatureUnit: string;
	ovenMode: string;
	_id: oid;
}

interface Utensil {
	id: string;
	type: string;
	name: string;
	_id: oid;
}

interface Ingredient {
	name: string;
	slug: string;
	imagePath: string;
	_id: oid;
}

interface Category {
	type: string;
	name: string;
	slug: string;
	iconLink: string;
	iconPath: string;
	_id: oid;
}

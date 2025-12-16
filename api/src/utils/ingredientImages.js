// async function getIngredientsWithImages() {
// 	// Step 1: fetch all ingredients from MealDB
// 	const ingRes = await fetch(
// 		"https://www.themealdb.com/api/json/v1/1/list.php?i=list"
// 	);
// 	const ingData = await ingRes.json();
// 	const ingredientsList = ingData.meals || [];

// 	// Step 2: deduplicate ingredient names
// 	const uniqueIngredients = [
// 		...new Set(ingredientsList.map((i) => i.strIngredient)),
// 	];

// 	// Step 3: build objects with image URLs
// 	const ingredientsWithImages = uniqueIngredients.map((name) => ({
// 		name,
// 		ingredientImage: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(
// 			name
// 		)}.png`,
// 	}));

// 	return ingredientsWithImages;
// }

// export default async function attachIngredientImagesToDummyRecipes() {
// 	// fetch dummyjson recipes
// 	const recipesRes = await fetch("https://dummyjson.com/recipes");
// 	const recipesData = await recipesRes.json();
// 	const recipes = recipesData.recipes;

// 	// get the ingredient images once
// 	const ingredientsWithImages = await getIngredientsWithImages();

// 	// Step 4: for each recipe’s ingredients, attach the image
// 	const updatedRecipes = recipes.map((recipe) => {
// 		const updatedIngredients = recipe.ingredients.map((ingName) => {
// 			const match = ingredientsWithImages.find(
// 				(i) => i.name.toLowerCase() === ingName.toLowerCase()
// 			);
// 			return {
// 				name: ingName,
// 				ingredientImage: match ? match.ingredientImage : null,
// 			};
// 		});

// 		return {
// 			...recipe,
// 			ingredients: updatedIngredients,
// 		};
// 	});

// 	return updatedRecipes;
// }

// // Usage example
// // attachIngredientImagesToDummyRecipes().then((recipesWithImages) => {
// // 	console.log(recipesWithImages);
// // });

async function getIngredientsWithImages() {
	const res = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?i=list"
	);
	const data = await res.json();
	const ingredientsList = data.meals || [];

	const uniqueIngredients = [
		...new Set(ingredientsList.map((i) => i.strIngredient)),
	];

	return uniqueIngredients.map((name) => ({
		name,
		ingredientImage: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(
			name
		)}.png`,
	}));
}

async function fetch300Recipes() {
	const recipes = [];
	const limit = 50;
	let skip = 0;

	while (recipes.length < 300) {
		const res = await fetch(
			`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`
		);
		const data = await res.json();

		if (!data.recipes || data.recipes.length === 0) break;

		recipes.push(...data.recipes);
		skip += limit;
	}

	return recipes.slice(0, 300);
}

async function attachIngredientImagesToRecipes(recipes) {
	const ingredientsWithImages = await getIngredientsWithImages();

	return recipes.map((recipe) => {
		const updatedIngredients = recipe.ingredients.map((name) => {
			const match = ingredientsWithImages.find(
				(i) => i.name.toLowerCase() === name.toLowerCase()
			);

			return {
				name,
				ingredientImage: match ? match.ingredientImage : null,
			};
		});

		return {
			...recipe,
			ingredients: updatedIngredients,
		};
	});
}

export async function get300RecipesWithIngredientImages() {
	const recipes = await fetch300Recipes();
	const finalRecipes = await attachIngredientImagesToRecipes(recipes);
	return finalRecipes;
}
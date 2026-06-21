import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
	{
		recipe_name: { type: String, required: false },
		recipe_category: { type: String, required: false },
		recipe_thumb: { type: String, required: false },
		description: { type: String, required: false },
		country_of_origin: { type: String, required: false },
		number_of_people_served: { type: Number, required: false },
		ingredients: { type: String, required: false },
		instructions: { type: String, required: false },
		approved: { type: Boolean, default: false },
		youtube_code: { type: String, required: false },
		user_id: { type: Number, required: false },
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

// {
// 	caloriesPerServing: { type: Number, required: true },
// 	cookTimeMinutes: { type: Number, required: true },
// 	cuisine: { type: String, required: true },
// 	difficulty: { type: ["Easy", "Medium", "Hard"], default: "Easy", required: true },
// 	image: {type: String, required: false },
// 	ingredients: { type: [String], required: true },
// 	instructions: { type: [String], required: true },
// ingredients: [
		// 	{
		// 		name: { type: String, required: false },
		// 		quantity: { type: String, required: false },
		// 		image: { type: String, required: false },
		// 		default: [],	
		// 	},	
		// ],
// 	mealType: { type: ["Breakfast", "Lunch", "Dinner"], required: true },
// 	name: { type: String, required: true },
// 	prepTimeMinutes: { type: Number, required: true },
// 	rating: { type: Number, required: true },
// 	servings: { type: Number, required: true },
// 	tags: { type: [String], required: true },
// 	review: { type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true },
// 	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// }
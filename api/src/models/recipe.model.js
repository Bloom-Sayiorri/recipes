import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
	{
		recipe_name: { type: String},
		recipe_category: { type: String },
		recipe_thumb: { type: String },
		description: { type: String },
		country_of_origin: { type: String },
		number_of_people_served: { type: Number },
		ingredients: [String],
		instructions: { type: String },
		approved: { type: Boolean, default: false },
		youtube_code: { type: String },
		user_id: { type: Number },
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

// {
	// 	image: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	name: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	category: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	description: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	cuisine: {
	// 		type: String,
	// 		required: true,
	// 	},
	// 	ingredients: {
	// 		type: [String],
	// 		required: true,
	// 	},
	// 	instructions: {
	// 		type: [String],
	// 		required: true,
	// 	},
	// 	prepTime: {
	// 		type: Number,
	// 		required: true,
	// 	},
	// 	cookingTime: {
	// 		type: Number,
	// 		required: true,
	// 	},
	// 	servings: {
	// 		type: Number,
	// 		required: true,
	// 	},
	// 	user: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "User",
	// 		required: true,
	// 		index: true,
	// 	},
	// 	reviews: [
	// 		{
	// 			comment: String,
	// 			rating: Number,
	// 			user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	// 		},
	// 	],
	// },
	// {
	// 	name: String,
	// 	ingredients: [{ name: String, ingredientImage: String }],
	// 	instructions: [String],
	// 	prepTimeMinutes: Number,
	// 	cookTimeMinutes: Number,
	// 	servings: Number,
	// 	difficulty: [String],
	// 	cuisine: String,
	// 	caloriesPerServing: Number,
	// 	tags: [String],
	// 	userId: Number,
	// 	image: String,
	// 	rating: Number,
	// 	reviewCount: Number,
	// 	mealType: [String],
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "User",
	// 	required: true,
	// 	index: true,
	// },
	// reviews: {
	// 	{
	// 		comment: String,
	// 		rating: Number,
	// 		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	// 	},
	// },

	// },
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
	{
		image: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		countryOfOrigin: {
			type: String,
			required: true,
		},
		ingrdients: {
			type: String,
			required: true,
		},
		instructions: {
			type: String,
			required: true,
		},
		cookingTime: {
			type: String,
			required: true,
		},
		servings: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;


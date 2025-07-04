import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		ingredients: {
			type: String,
			required: true,
		},
		instructions: {
			type: String,
			required: true,
		},
		category: {
			type: Stringg,
			required: true,
		},
		cookingTime: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

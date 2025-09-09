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
		cuisine: {
			type: String,
			required: true,
		},
		ingredients: {
			type: [String],
			required: true,
		},
		instructions: {
			type: [String],
			required: true,
		},
		prepTime: {
			type: Number,
			required: true,
		},
		cookingTime: {
			type: Number,
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
		reviews: [
			{
				comment: String,
				rating: Number,
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			},
		],
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;


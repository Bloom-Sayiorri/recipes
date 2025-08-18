import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
			minLength: [5, "Comments must be at least 5 characters."],
			required: false,
		},
		rating: {
			type: Number,
			min: [1, "Rating must be between 1-5."],
			max: [5, "Rating must be between 1-5."],
			required: false,
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

const Review = mongoose.model("Review", reviewSchema);

export default Review;


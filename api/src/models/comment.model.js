import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema(
	{
		comments: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("commentModel", mongoose.model(mongooseSchema));

export default Comment;

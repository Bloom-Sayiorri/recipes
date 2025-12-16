import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
			maxLength: 500,
		},
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		notifications: String,
		preferences: {
			diet: {
				type: String,
				enum: [
					"vegeterian",
					"none",
					"gluten-free",
					"lactose-intolerant",
					"keto",
				],
			},
			allergies: [String],
			cuisine: [String],
		},
		sociaLinks: {
			website: String,
			instagram: String,
			twitter: String,
		},
	},
	{ timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;


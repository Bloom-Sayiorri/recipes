import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
			maxLength: 500,
		},
		followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
		following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
		notifications: {
			type: String,
			enum: ["all", "mentions", "important", "none"],
			default: "all",
			required: false,
		},
		preferences: {
			diet: {
				type: String,
				enum: ["vegeterian", "none", "gluten-free", "lactose-intolerant", "keto"],
				required: false,
			},
			allergies: { type: [String], required: false },
			cuisine: { type: [String], required: false },
		},
		socialLinks: {
			website: { type: String, required: false },
			instagram: { type: String, required: false },
			twitter: { type: String, required: false },
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;






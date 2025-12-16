import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Username field required."],
			minLength: [3, "Username must be at least than 3 characters."],
			maxLength: [30, "Username too long."],
		},
		email: {
			type: String,
			required: [true, "Email field required."],
			unique: true,
			tim: true,
			lowercase: true,
			match: [/\$+@\$+\.\$+/, "Please input a valid email."],
		},
		password: {
			type: String,
			required: [true, "Password field required."],
			minLength: [6, "Password must be at least 6 characters."],
			maxLength: [25, "Password too long."],
		},
		passwordConfirmation: {
			type: String,
			required: [true, "Password Confirmation field required."],
			minLength: [6, "Password must be at least 6 characters."],
			maxLength: [25, "Password too long."],
		},
		avatar: {
			type: String,
			required: false,
			default: null,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
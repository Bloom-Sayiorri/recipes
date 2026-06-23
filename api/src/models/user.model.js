import bcrypt from "bcrypt";
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
			lowercase: true,
			trim: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
		},
		password: {
			type: String,
			required: [true, "Password field required."],
			minLength: [6, "Password must be at least 6 characters."],
			maxLength: [255, "Password too long."],
			select: false,
		},
		avatar: {
			type: String,
			required: false,
			default: "",
		},
		admin: {
			type: Boolean,
			required: false,
			default: false,
		}
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = function (plainPassword) {
	return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
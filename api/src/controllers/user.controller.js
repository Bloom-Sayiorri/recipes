import mongoose from "mongoose";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Review from "../models/review.model.js";
import Recipe from "../models/recipe.model.js";
import { filterObject } from "../utils/filterObject.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		if (!users) {
			return next(new AppError("No users found in the database", 404));
		}
		res.status(200).json(users);
	} catch (error) {
		next(new AppError("Failed retrieving users", 500));
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).select("-password");

		if (!user) {
			return next(new AppError("User does not exist.", 404));
		}
		res.status(200).json(user);
	} catch (error) {
		next(new AppError("Failed retrieving user", 500));
	}
};

const signUp = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const { username, email, password, passwordConfirmation } = req.body;

		// Basic validation
		if (!username || !email || !password || !passwordConfirmation) {
			return next(new AppError("All fields are required", 422));
		}
		// Check if passwords match
		if (password !== passwordConfirmation) {
			return next(new AppError("Passwords do not match", 422));
		}
		// Check if user exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return next(new AppError("User already exists", 409));
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create(
			{ username, email, password: hashedPassword },
			{ session }
		);

		const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			success: true,
			message: "User created successfully.",
			data: { token, user: newUser[0] },
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const userFields = filterObject(req.body, "username", "email");
		const profileFields = filterObject(
			req.body,
			"bio",
			"avatar",
			"preferences",
			"socialLinks"
		);

		if (
			Object.keys(userFields).length === 0 &&
			Object.keys(profileFields).length === 0
		) {
			return next(
				new AppError("No valid fields provided for update.", 400)
			);
		}

		// Update user
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			userFields,
			{
				new: true,
				runValidators: true,
			}
		).select("-password");

		if (!updatedUser) {
			return next(new AppError("User not found.", 404));
		}

		// Update or create profile
		let profile = await Profile.findOne({ user: req.user._id });
		if (!profile) {
			profile = await Profile.create({
				user: req.user._id,
				...profileFields,
			});
		} else {
			profile = await Profile.findByIdAndUpdate(
				profile._id,
				profileFields,
				{
					new: true,
					runValidators: true,
				}
			);
		}

		if (!profile && Object.keys(profileFields).length > 0) {
			profile = await Profile.create({
				user: req.user._id,
				...profileFields,
			});
		}

		res.status(200).json({
			success: true,
			message: "User updated successfully.",
			data: { updatedUser, profile },
		});
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		await Promise.all([
			Recipe.deleteMany({ user: userId }),
			Review.deleteMany({ user: userId }),
		]);

		const user = await User.findByIdAndDelete(userId);
		if (!user) {
			return next(new AppError("User not found", 404));
		}

		res.status(200).json({
			success: true,
			message: "User deleted successully.",
		});
	} catch (error) {
		next(new AppError("Failed to delete user", 500));
	}
};

const UserController = {
	getAllUsers,
	getUser,
	signUp,
	updateUser,
	deleteUser,
};
export default UserController;

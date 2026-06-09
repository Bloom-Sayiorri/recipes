import mongoose from "mongoose";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import Review from "../models/review.model.js";
import Recipe from "../models/recipe.model.js";
import { filterObject } from "../utils/filterObject.js";
import AppError from "../utils/appError.js";

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});
		if (users.length === 0) {
			return next(new AppError("No users found.", 404));
		}
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).select("-password");

		if (!user) {
			return next(new AppError("User not found.", 404));
		}
		res.status(200).json(user);
	} catch (error) {
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
		next(error);
	}
};

const UserController = {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
};

export default UserController;
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signup = async (req, res, next) => {
	try {
		const { username, email, password, passwordConfirmation } = req.body;
		if (!password || password !== passwordConfirmation) {
			return next(new AppError("Passwords do not match", 400));
		}
		const user = await User.create({ username, email, password });
		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(new AppError("Input fields are required.", 422));
		}

		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return next(new AppError("Invalid credentials", 401));
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(new AppError("Invalid credentials", 401));
		}

		const token = jwt.sign({ user_id: user.id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.status(200).json({
			success: true,
			message: "Login successful.",
			data: {
				token,
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
				},
			},
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @desc    Logout user (JWT-based logout usually handled client-side)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (req, res, next) => {
	try {
		// For JWT-based auth, logout is handled by the client
		// simply discarding the token.
		// (Optional: add token to a "blacklist" DB/Redis to invalidate it.)

		res.status(200).json({
			success: true,
			message: "Logout successful.",
		});
	} catch (error) {
		next(error);
	}
};
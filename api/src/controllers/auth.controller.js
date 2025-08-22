import User from "../models/user.model";
import AppError from "../utils/appError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// ✅ Validate input
		if (!email || !password) {
			return next(new AppError("Input fields are required.", 422));
		}

		// ✅ Find user
		const user = await User.findOne({ email });
		if (!user) {
			return next(new AppError("Invalid credentials", 401));
		}

		// ✅ Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(new AppError("Invalid credentials", 401));
		}

		// ✅ Sign JWT
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		res.status(200).json({
			success: true,
			message: "Login successful.",
			data: {
				token,
				user: {
					id: user._id,
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


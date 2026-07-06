import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { JWT_SECRET } from "../config/env.js";

export const protect = async (req, res, next) => {
	try {
		let token;
		// Check header: "Authorization: Bearer <token>"
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return next(new AppError("Not authorized, token is missing.", 401));
		}

		// Verify token
		const decoded = jwt.verify(token, JWT_SECRET);

		// Attach user to request
		const user = await User.findById(decoded.user_id).select("-password");
		if (!user) {
			return next(new AppError("User no longer exists.", 401));
		}

		req.user = user; // 🔥 now available in controller
		next();
	} catch (err) {
		console.error(err)
		next(err);
	}
};
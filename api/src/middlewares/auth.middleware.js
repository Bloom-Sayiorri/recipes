import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

export const protect = async (req, res, next) => {
	try {
		let token;

		// Check header: "Authorization: Bearer <token>"
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return next(new AppError("Not authorized, token missing.", 401));
		}

		// Verify token
		const decoded = jwt.verify(token, JWT_SECRET);

		// Attach user to request
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return next(new AppError("User no longer exists.", 401));
		}

		req.user = user; // 🔥 now available in controller
		next();
	} catch (err) {
		next(new AppError("Not authorized, invalid token.", 401));
	}
};


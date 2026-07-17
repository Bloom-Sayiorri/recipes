import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import errorMiddleware from "./middlewares/error.middleware.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import recipeRouter from "./routes/recipe.route.js";
import reviewRouter from "./routes/review.route.js";
import favoriteRouter from "./routes/favorite.route.js";
import notificationRouter from "./routes/notification.route.js";
import profileRouter from "./routes/profile.route.js";
import contactRouter from "./routes/contact.route.js";

const app = express();

app.use(
	cors({
		origin: ["https://recipiez-share.netlify.app", "http://localhost:4001"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

app.get("/test", (req, res) => {
	res.json({ message: "API is working" });
});

app.use(async (req, res, next) => {
	try {
		await connectDB();
		next();
	} catch (err) {
		next(err);
	}
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/contact", contactRouter);

app.use(errorMiddleware);

export default app;
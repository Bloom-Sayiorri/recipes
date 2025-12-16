import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import recipeRouter from "./routes/recipe.route.js";
import reviewRouter from "./routes/review.route.js";

dotenv.config();
const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4001"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port: http://localhost:${PORT}`);
});
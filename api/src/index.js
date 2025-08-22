import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import recipeRouter from "./routes/recipe.route.js";
import reviewRouter from "./routes/review.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
	// connectDB();
	console.log(`Server is running on port: http://localhost:${PORT}`);
});


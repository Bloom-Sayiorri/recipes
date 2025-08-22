import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export default async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("DB Connected successfully!");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}


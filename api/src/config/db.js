import mongoose from "mongoose";
import { mongoUri } from "./env.js";

export default async function connectDB() {
	try {
		await mongoose.connect(mongoUri);
		console.log("DB Connected successfully!");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}


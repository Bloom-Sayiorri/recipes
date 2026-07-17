import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export default async function connectDB() {
	try {
		if (mongoose.connection.readyState >= 1) {return};
		await mongoose.connect(MONGO_URI);
		console.log("DB Connected successfully!");
	} catch (error) {
		console.log(error);
		throw error;
	}
}
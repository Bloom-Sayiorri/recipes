import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export default async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI)
		console.log("DB Connected successfully!");
		// mongoose.connection.once("open", async () => {
		// 	console.log("DB:", mongoose.connection.name);
		// 	const cols = await mongoose.connection.db.listCollections().toArray();
		// 	console.log(
		// 		"Collections:",
		// 		cols.map((c) => c.name)
		// 	);
		// });
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}
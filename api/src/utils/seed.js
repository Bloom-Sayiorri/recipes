import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";
import { MONGO_URI } from "../config/env.js";
import fs from "fs";
import path from "path";

export default async function seed() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected on seed.js");

		console.log("Preparing to seed database! 🌱🌱🌱");
		const filePath = path.join(process.cwd(), "src", "utils", "db.json");
		const rawData = fs.readFileSync(filePath, "utf-8");
		const data = JSON.parse(rawData);
		const recipes = data.meals || [];
		// console.log(recipes)
		await Recipe.deleteMany({});
		console.log("Existing recipes removed");
		await Recipe.insertMany(recipes);
		console.log(`Database seeded successfully with ${recipes.length} recipes ✅✅✅`);
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		// throw new Error("Failed to seed database! 😔😔😔");
		console.error(error);
		process.exit(1);
	}
}
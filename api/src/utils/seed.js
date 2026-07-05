import fs from "fs";
import path from "path";

import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import Recipe from "../models/recipe.model.js";
import Favorite from "../models/favorite.model.js";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";
import Notification from "../models/notification.model.js";
import Profile from "../models/profile.model.js";
import Contact from "../models/contact.model.js";

export async function seedUsers() {
	const users = [];
	try {
		for (let i = 0; i < 20; i++) {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();

			users.push({
				username: `${firstName} ${lastName}`,
				email: `${firstName}${lastName}@example.com`.toLowerCase(),
				password: await bcrypt.hash("password123", 10),
				avatar: "",
			});
		}
		await mongoose.connect(MONGO_URI);
		console.log("Mongo db connected on seed.js");
		await User.deleteMany({});
		console.log("Preparing to seed users into database! 🌱🌱🌱");
		await User.insertMany(users);
		console.log(`Database seeded with ${users.length} users`);
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export async function seedRecipes() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected on seed.js");

		console.log("Preparing to seed database! 🌱🌱🌱");
		const filePath = path.join(process.cwd(), "src", "utils", "db.json");
		const rawData = fs.readFileSync(filePath, "utf-8");
		const data = JSON.parse(rawData);
		const recipes = data.meals || [];
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

export async function seedFavorites() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Mongo DB connected on seed.js");

		console.log("Preparing to seed database! 🌱🌱🌱");

		await Favorite.deleteMany({});
		const favorites = [];
		const recipes = await Recipe.find({});
		const users = await User.find({});
		for (const user of users) {
			for (let i = 0; i < 3; i++) {
				const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
				favorites.push({
					user: user.id,
					recipe: randomRecipe.id,
				});
			}
		}
		await Favorite.insertMany(favorites);

		console.log(`Database seeded successfully with ${favorites.length} favorites ✅✅✅`);
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export async function seedReviews() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Mongo DB connected on seed.js");

		console.log("Preparing to seed database! 🌱🌱🌱");
		await Review.deleteMany({});

		const reviews = [];
		const users = await User.find({});
		const recipes = await Recipe.find({});
		const positiveComments = [
			"Absolutely delicious!",
			"My family loved it.",
			"Easy to make and very tasty.",
			"Will definitely cook this again.",
			"One of the best recipes I have tried.",
		];

		const neutralComments = [
			"It was okay.",
			"Not bad, but needs more seasoning.",
			"Decent recipe overall.",
			"Turned out fine.",
		];

		const negativeComments = [
			"Did not work well for me.",
			"Would not make again.",
			"The flavor was disappointing.",
			"Expected better results.",
		];
		function generateComment(rating) {
			if (rating >= 4) {
				return faker.helpers.arrayElement(positiveComments);
			} else if (rating === 3) {
				return faker.helpers.arrayElement(neutralComments);
			}
			return faker.helpers.arrayElement(negativeComments);
		}
		for (let i = 0; i < 100; i++) {
			const randomUser = users[Math.floor(Math.random() * users.length)];
			const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
			const ratings = faker.number.int({
				min: 3,
				max: 5,
			});

			reviews.push({
				comment: generateComment(ratings),
				rating: ratings,
				recipe: randomRecipe.id,
				user: randomUser.id,
			});
		}
		await Review.insertMany(reviews);
		console.log(`Database seeded successfully with ${reviews.length} reviews ✅✅✅`);
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export async function seedNotifications() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Mongo DB connected on seed.js");
		console.log("Preparing to seed database🌱🌱🌱");
		await Notification.deleteMany({});
		const notifications = [];
		const recipes = await Recipe.find({});
		const users = await User.find({});
		const types = ["follow", "like", "comment", "system", "custom"];
		for (let i = 0; i < 50; i++) {
			const type = faker.helpers.arrayElement(types);

			const from = faker.helpers.arrayElement(users);
			const user = faker.helpers.arrayElement(users.filter((u) => u._id.toString() !== from._id.toString()));

			let message;
			let data = {};

			switch (type) {
				case "follow":
					message = `${from.username} started following you`;
					data = { followerId: from._id };
					break;

				case "like":
					const likedRecipe = faker.helpers.arrayElement(recipes);
					message = `${from.username} liked your recipe`;
					data = { recipeId: likedRecipe._id };
					break;

				case "comment":
					const commentedRecipe = faker.helpers.arrayElement(recipes);
					message = `${from.username} commented on your recipe`;
					data = {
						recipeId: commentedRecipe._id,
						comment: faker.lorem.sentence(),
					};
					break;

				case "system":
					message = "Welcome to the platform!";
					data = { action: "welcome" };
					break;

				case "custom":
					message = "New recipes have been added, check them out!";
					data = {
						note: "New Recipes Alert!",
					};
					break;
			}

			notifications.push({
				type,
				message,
				data,
				from: from._id,
				user: user._id,
				read: faker.datatype.boolean(),
			});
		}
		await Notification.insertMany(notifications);
		console.log(`Database seeded successfully with ${notifications.length} notifications ✅✅✅`);
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export async function seedProfiles() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected on seed.js");
		console.log("Preparing to seed users into database! 🌱🌱🌱");

		await Profile.deleteMany({});
		const users = await User.find({});
		const diets = ["vegeterian", "none", "gluten-free", "lactose-intolerant", "keto"];
		const allergies = ["Peanuts", "Milk", "Eggs", "Soy", "Fish", "Shellfish", "Tree Nuts"];
		const cuisines = ["Italian", "Mexican", "Indian", "Chinese", "Japanese", "French", "African", "Mediterranean"];
		const profilesArr = [];

		for (const user of users) {
			profilesArr.push({
				avatar: faker.image.avatar(),
				bio: faker.lorem.paragraph(),
				notifications: faker.helpers.arrayElement(["all", "mentions", "important", "none"]),
				preferences: {
					diet: faker.helpers.arrayElement(diets),

					allergies: faker.helpers.arrayElements(allergies, faker.number.int({ min: 0, max: 3 })),

					cuisine: faker.helpers.arrayElements(cuisines, faker.number.int({ min: 1, max: 4 })),
				},
				socialLinks: {
					website: faker.internet.url(),
					instagram: faker.internet.username(),
					twitter: faker.internet.username(),
				},
				user: user._id,
			});
		}
		await Profile.insertMany(profilesArr);

		for (const profile of profiles) {
			const otherUsers = users.filter((user) => user._id.toString() !== profile.user.toString());

			const following = faker.helpers.arrayElements(otherUsers, faker.number.int({ min: 0, max: 10 }));

			profile.following = following.map((user) => user._id);

			await profile.save();
		}
		const profiles = await Profile.find({});
		for (const profile of profiles) {
			const otherUsers = users.filter((u) => u._id.toString() !== profile.user._id.toString());

			const followers = faker.helpers.arrayElements(otherUsers, faker.number.int({ min: 0, max: 10 }));

			profile.followers = followers.map((user) => user._id);
			await profile.save();
		}
		console.log("Profiles updated successfully");
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

export async function seedContacts() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("DB connected on seedContact");
		console.log("Preparing to seed contacts");

		let contact = [];
		const users = await User.find({});
		await Contact.deleteMany({});

		for (let i = 0; i < 10; i++) {
			const randomUser = users[Math.floor(Math.random() * users.length)];
			const name = randomUser.username;
			const email = randomUser.email;
			const contactObj = {
				fullname: name,
				email: email,
				comment: faker.lorem.sentence(),
			};
			contact.push(contactObj);
		}
		await Contact.insertMany(contact);
		console.log("Contacts seeded successfully");
		console.log(contact);
		mongoose.connection.close();
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

// export async function seedAll() {
// 	Promise.all([
// 		await seedUsers(),
// 		await seedRecipes(),
// 		await seedFavorites(),
// 		await seedReviews(),
// 		await seedNotifications(),
// 		await seedProfiles(),
//		await seedContactS(),
// 	]);
// }
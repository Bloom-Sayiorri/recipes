import Recipe from "../models/recipe.model.js";
import AppError from "../utils/appError.js";

const getAllRecipes = async (req, res, next) => {
	try {
		const recipes = await Recipe.find({});
		if (recipes.length === 0) {
			return next(new AppError("No recipes found.", 404));
		}
		res.status(200).json({
			success: true,
			message: "Recipes retrieved successfully.",
			data: recipes,
		});
	} catch (error) {
		next(error);
	}
};

const getRecipe = async (req, res, next) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return next(new AppError("Recipe not found.", 404));
		}
		res.status(200).json({
			success: true,
			message: "Recipe retrieved successffully.",
			data: recipe,
		});
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};

const createRecipe = async (req, res, next) => {
	try {
		const {
			recipe_name,
			recipe_category,
			recipe_thumb,
			description,
			country_of_origin,
			number_of_people_served,
			ingredients,
			instructions,
			approved,
			youtube_code,
		} = req.body;
		const recipe = await Recipe.create({
			recipe_name,
			recipe_category,
			recipe_thumb,
			description,
			country_of_origin,
			number_of_people_served,
			ingredients,
			instructions,
			approved,
			youtube_code,
			user: req.user._id,
		});
		res.status(201).json({
			success: true,
			message: "Recipe created successfully.",
			data: recipe,
		});
	} catch (error) {
		next(error);
	}
};

const updateRecipe = async (req, res, next) => {
	try {
		const id = req.params.id;
		const update = { ...req.body, user: req.user._id };
		const options = { new: true, runValidators: true };
		const recipe = await Recipe.findByIdAndUpdate(id, update, options);
		if (!recipe) {
			return next(new AppError("Recipe not found.", 404));
		}
		res.status(200).json({
			succcess: true,
			message: "Recipe updated successfully.",
			data: recipe,
		});
	} catch (error) {
		next(error);
	}
};

const deleteRecipe = async (req, res, next) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return next(new AppError("Recipe does not exist", 404));
		}
		res.status(204).json({
			success: true,
			message: "Recipe deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const RecipeController = {
	getAllRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
};

export default RecipeController;
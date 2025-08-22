import Recipe from "../models/recipe.model";
import AppError from "../utils/appError";

const getAllRecipes = async (req, res, next) => {
	try {
		const recipes = await Recipe.find();
		if (!recipes) {
			return next(new AppError("Failed retrieving recipes.", 404));
		}

		res.status(200).json({
			success: true,
			message: "Recipes retrieved successffully.",
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
		console.log(`${error.message}`);
		next(error);
	}
};

const createRecipe = async (req, res, next) => {
	try {
		const recipe = await Recipe.create({ ...req.body, user: req.user._id });
		if (!recipe) {
			return next(new AppError("Failed to create recipe.", 422));
		}

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

		res.status(201).json({
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
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

export default RecipeController = {
	getAllRecipes,
	getRecipe,
	createRecipe,
	updateRecipe,
	deleteRecipe,
};


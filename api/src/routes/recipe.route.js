import express from "express";
import RecipeController from "../controllers/recipe.controller.js";

const recipeRouter = express.Router();

const { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } =
	RecipeController;

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getRecipe);
recipeRouter.post("/new", createRecipe);
recipeRouter.put("/:id", updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);

export default recipeRouter;


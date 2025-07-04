import express from "express";
import RecipeController from "../controllers/recipe.controller";

const router = express.Router();

router.get("/recipes", RecipeController.getAllRecipes);

export default router;

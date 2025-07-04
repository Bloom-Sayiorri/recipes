import { json } from("express");
import Recipe from("../models/recipe.model");

const getAllRecipes = async (req,res,next) => {
    try {
        const recipes = await Recipe.findAll(req.params.recipe);
        if (res.ok) {
            return json(recipes);
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const getOneRecipe = async (req,res,next) => {
    try {
        const recipe = await  Recipe.findOneById(req.params.recipe);
        if (res.ok && recipe !== null) {return json(recipe);}
    } catch (error) {
        console.log(`${error.message}`);
        next(error);
    }
}

const createRecipe = async (req,res,next) => {
    try {
        const newRecipe = await new Recipe();
        if(res.ok && newRecipe !== null) {return json(newRecipe)}
    } catch (error) {
        console.log(`${error.message}`);
        next(error);
    }
}

export default RecipeController = {getAllRecipes, getOneRecipe, createRecipe};
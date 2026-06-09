import express from "express";
import FavoriteController from "../controllers/favorite.controller.js";

const favoriteRouter = express.Router();

const {
	getAllFavorites,
	getFavorite,
	createFavorite,
	updateFavorite,
	deleteFavorite,
} = FavoriteController;

favoriteRouter.get("/", getAllFavorites);
favoriteRouter.get("/:id", getFavorite);
favoriteRouter.post("/", createFavorite);
favoriteRouter.patch("/:id", updateFavorite);
favoriteRouter.delete("/:id", deleteFavorite);

export default favoriteRouter;
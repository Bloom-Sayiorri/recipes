import express from "express";
import FavoriteController from "../controllers/favorite.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const favoriteRouter = express.Router();

const {
	getAllFavorites,
	getFavorite,
	createFavorite,
	updateFavorite,
	deleteFavorite,
} = FavoriteController;

favoriteRouter.get("/", protect, getAllFavorites);
favoriteRouter.get("/:id", getFavorite);
favoriteRouter.post("/", createFavorite);
favoriteRouter.patch("/:id", updateFavorite);
favoriteRouter.delete("/:id", deleteFavorite);

export default favoriteRouter;
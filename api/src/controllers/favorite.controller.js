import Favorite from "../models/favorite.model.js";
import AppError from "../utils/appError.js";

const getAllFavorites = async (req, res, next) => {
	try {
		const favorites = await Favorite.find({}).select("-createdAt -updatedAt");
		if (favorites.length === 0) {
			return next(new AppError("No favorites found", 404));
		}
		return res.status(200).json({
			success: true,
			message: "Favorites retrieved successfully.",
			data: favorites,
		});
	} catch (error) {
		next(error);
	}
};

const getFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		const favorite = await Favorite.findById(id).select("-createdAt -updatedAt");
		if (!favorite) {
			return next(new AppError("Favorite not found", 404));
		}
		return res.status(200).json({
			success: true,
			message: "Favorite retrieved successfully.",
			data: favorite,
		});
	} catch (error) {
		next(error);
	}
};

const createFavorite = async (req, res, next) => {
	try {
		const favorite = await Favorite.create({ recipe: req.recipe._id, user: req.user._id });
		return res.status(201).json({
			success: true,
			message: "Favorite created successfully.",
			data: favorite,
		});
	} catch (error) {
		next(error);
	}
};

const updateFavorite = async (req, res, next) => {
	try {
		const { comment, rating } = req.body;
		const favorite = await Favorite.findByIdAndUpdate(req.params.id, {
			comment,
			rating,
		}).select("-createdAt -updatedAt");
		if (!favorite) {
			return next(new AppError("Favorite not found", 404));
		}
		return res.status(200).json({
			success: true,
			message: "Favorite updates successfully.",
			data: favorite,
		});
	} catch (error) {
		next(error);
	}
};

const deleteFavorite = async (req, res, next) => {
	try {
		await Favorite.findByIdAndDelete(req.params.id);
		if (!favorite) {
			return next(new AppError("Favorite not found", 404));
		}
		return res.status(204).json({
			success: true,
			message: "Favorite deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const FavoriteController = {
	getAllFavorites,
	getFavorite,
	createFavorite,
	updateFavorite,
	deleteFavorite,
};

export default FavoriteController;
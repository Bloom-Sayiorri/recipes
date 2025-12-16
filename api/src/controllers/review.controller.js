import Review from "../models/review.model.js";
import AppError from "../utils/appError.js";

const getAllReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find();
		if (!reviews) {
			return next(new AppError("Failed to retrieve reviews.", 404));
		}
		res.status(200).json({
			success: true,
			message: "Retrieved reviews successfully",
			data: reviews,
		});
	} catch (error) {
		next(error);
	}
};

const getReview = async (req, res, next) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			return next(new AppError("Failed to retrieve review.", 404));
		}
		res.status(200).json({
			success: true,
			message: "Retrieved review successfully",
			data: review,
		});
	} catch (error) {
		next(error);
	}
};

const createReview = async (req, res, next) => {
	try {
		const review = await Review.create({ ...req.body, user: req.user._id });
		if (!review) {
			return next(new AppError("Failed to create review", 422));
		}
		res.status(201).json({
			success: true,
			message: "Review created successfully.",
			data: review,
		});
	} catch (error) {
		next(error);
	}
};

const updateReview = async (req, res, next) => {
	try {
		const id = req.params;
		const update = filterObject;

		const review = await Review.create(id, update, options);

		res.status(200).json({
			success: true,
			message: "Review updated successfully.",
			data: review,
		});
	} catch (error) {
		next(error);
	}
};
const deleteReview = async (req, res, next) => {
	try {
		const review = await Review.findByIdAndDelete(req.params.id);
		if (!review) {
			return next(new AppError("Review not found", 404));
		}
		res.status(204).json({
			success: true,
			message: "Review deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

const ReviewController = {
	getAllReviews,
	getReview,
	createReview,
	updateReview,
	deleteReview,
};

export default ReviewController;

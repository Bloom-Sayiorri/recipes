import express from "express";
import ReviewController from "../controllers/review.controller.js";

const router = express.Router();

const { getAllReviews, getReview, createReview, updateReview, deleteReview } =
	ReviewController;

router.get("/", getAllReviews);
router.get("/:id", getReview);
router.post("/new", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
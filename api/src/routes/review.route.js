import express from "express";
import ReviewController from "../controllers/review.controller.js";

const router = express.Router();

const { getAllReviews, getReview, createReview, updateReview, deleteReview } =
	ReviewController;

router.get("/", getAllReviews);
router.get("/:id", getReview);
router.post("/", createReview);
router.put("/", updateReview);
router.delete("/", deleteReview);

export default router;

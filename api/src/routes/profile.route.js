import express from "express";
import ProfileController from "../controllers/profile.controller.js";

const profileRouter = express.Router();

const {
	getAllProfiles,
	getProfile,
	createProfile,
	updateProfile,
	deleteProfile,

} = ProfileController;

profileRouter.get("/", getAllProfiles);
profileRouter.get("/:id", getProfile);
profileRouter.post("/new", createProfile);
profileRouter.patch("/:id", updateProfile);
profileRouter.delete("/:id", deleteProfile);

export default profileRouter;
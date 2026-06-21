import Profile from "../models/profile.model.js";
import AppError from "../utils/appError.js";

const getAllProfiles = async (req, res, next) => {
	try {
		const profiles = await Profile.find({});
		if (profiles.length === 0) {
			return next(new AppError("Profiles not found", 404));
		}
		res.status(200).json({
			success: true,
			message: "Profiles retrieved successfully.",
			data: profiles,
		});
	} catch (error) {
		next(error);
	}
};

const getProfile = async (req, res, next) => {
	try {
		const profile = await Profile.findById(req.params.id).select("-createdAt -updatedAt");
		if (!profile) {
			return next(new AppError("Profile does not exist", 404));
		}
		res.status(200).json({
			success: "true",
			message: "Profile retrieved successfully",
			data: profile,
		});
	} catch (error) {
		next(error);
	}
};

const createProfile = async (req, res, next) => {
	try {
		const { avatar, bio, preferences, socialLinks } = req.body;

		const profile = await Profile.create({
			avatar,
			bio,
			preferences,
			socialLinks,
			user: req.user.id,

			// server-controlled defaults
			followers: [],
			following: [],
			notifications: [],
		});

		res.status(201).json({
			success: true,
			message: "Profile created successfully.",
			data: profile,
		});
	} catch (error) {
		next(error);
	}
};

const updateProfile = async (req, res, next) => {
	try {
		const { preferences, socialLinks, avatar, bio } = req.body;
		const update = {};
		if (avatar !== undefined) update.avatar = avatar;
		if (bio !== undefined) update.bio = bio;
		if (preferences) {
			update.preferences = {};

			if (preferences.diet !== undefined) update.preferences.diet = preferences.diet;

			if (preferences.allergies !== undefined) update.preferences.allergies = preferences.allergies;

			if (preferences.cuisine !== undefined) update.preferences.cuisine = preferences.cuisine;

			if (Object.keys(update.preferences).length === 0) {
				delete update.preferences;
			}
		}
		if (socialLinks) {
			update.socialLinks = {};

			if (socialLinks.website !== undefined) update.socialLinks.website = socialLinks.website;

			if (socialLinks.instagram !== undefined) update.socialLinks.instagram = socialLinks.instagram;

			if (socialLinks.twitter !== undefined) update.socialLinks.twitter = socialLinks.twitter;

			if (Object.keys(update.socialLinks).length === 0) {
				delete update.socialLinks;
			}
		}

		const profile = await Profile.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });

		if (!profile) {
			return next(new AppError("Profile not found", 404));
		}

		res.status(200).json({
			success: true,
			data: profile,
		});
	} catch (error) {
		next(error);
	}
};

const deleteProfile = async (req, res, next) => {
	try {
		const profile = await Profile.findByIdAndDelete(req.params.id);
		if (!profile) {
			return next(new AppError("Profile not found", 404));
		}
	} catch (error) {
		next(error);
	}
};

const ProfileController = {
	getAllProfiles,
	getProfile,
	createProfile,
	updateProfile,
	deleteProfile,
};

export default ProfileController;
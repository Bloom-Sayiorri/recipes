import Notification from "../models/notification.model.js";
import AppError from "../utils/appError.js";

const getAllNotifications = async (req, res, next) => {
	try {
		const notifications = await Notification.find({});
		if (notifications.length === 0) {
			return next(new AppError("Notifications not found", 404));
		}
		res.status(200).json({
			success: true,
			message: "Notifications retrieved successfully.",
			data: notifications,
		});
	} catch (error) {
		next(error);
	}
};

const getNotification = async (req, res, next) => {
	try {
		const notification = await Notification.findById(req.params.id);
		if (!notification) {
			return next(new AppError("Notification does not exist", 404));
		}
		res.status(200).json({
			success: "true",
			message: "Notification retrieved successfully",
			data: notification,
		});
	} catch (error) {
		next(error);
	}
};

const createNotification = async (req, res, next) => {
	try {
		const { data, message, type, user } = req.body;
		const notification = await Notification.create({
			data,
			message,
			type,
			from: req.user._id,
			user
		});
		res.status(201).json({
			success: true,
			message: "Recipe created successfully.",
			data: notification,
		});
	} catch (error) {
		next(error);
	}
};

const updateNotification = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { read } = req.body;

		const update = { read };

		Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);

		const notification = await Notification.findByIdAndUpdate(id, update, { new: true, runValidators: true });

		if (!notification) {
			return next(new AppError("Notification not found.", 404));
		}
		if (notification.user.toString() !== req.user._id.toString()) {
			return next(new AppError("Not authorized", 403));
		}

		res.status(200).json({
			success: true,
			message: "Notification updated successfully.",
			data: notification,
		});
	} catch (error) {
		next(error);
	}
};

const deleteNotification = async (req, res, next) => {
	try {
		const notification = await Notification.findByIdAndDelete(req.params.id);
		if (!notification) {
			return next(new AppError("Notification not found", 404));
		}
	} catch (error) {
		next(error);
	}
};

const NotificationController = {
	getAllNotifications,
	getNotification,
	createNotification,
	updateNotification,
	deleteNotification,
};

export default NotificationController;
import express from "express";
import NotificationController from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

const { getAllNotifications, getNotification, createNotification, updateNotification, deleteNotification } =
	NotificationController;

notificationRouter.get("/", getAllNotifications);
notificationRouter.get("/:id", getNotification);
notificationRouter.post("/new", createNotification);
notificationRouter.patch("/:id", updateNotification);
notificationRouter.delete("/:id", deleteNotification);

export default notificationRouter;
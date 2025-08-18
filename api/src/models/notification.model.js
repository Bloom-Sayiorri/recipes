import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		type: {
			type: String,
			enum: ["follow", "like", "comment", "system", "custom"],
			required: true,
		},
		message: { type: String },
		data: { type: mongoose.Schema.Types.Mixed },
		read: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const NotificationModel = mongoose.Model("Notification", notificationSchema);

export default NotificationModel;


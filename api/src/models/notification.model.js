import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		data: { type: mongoose.Schema.Types.Mixed, required: true },
		message: { type: String, required: true },
		type: {
			type: String,
			enum: ["follow", "like", "comment", "system", "custom"],
			required: true,
		},
		read: { type: Boolean, default: false, index: true },
		from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);


export default Notification;
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);


export default Contact;
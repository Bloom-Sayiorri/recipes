import Contact from "../models/contact.model.js";

export const createContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body);

        res.status(201).json({
            success: true,
            message: "Contact message sent successfully.",
            data: contact,
        })
    } catch (error) {
        next(error);
    }
}

const ContactController = { createContact }

export default ContactController;
import express from "express";
import ContactController from "../controllers/contact.controller.js";

const contactRouter = express.Router();

const { createContact } = ContactController;

contactRouter.post("/", createContact);

export default contactRouter;
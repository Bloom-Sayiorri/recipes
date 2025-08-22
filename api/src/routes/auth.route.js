import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/logout", protect, logout);

export default authRouter;

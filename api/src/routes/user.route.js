import { Router } from "express";
import UserController from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const userRouter = Router();

const { getAllUsers, getUser, signUp, updateUser, deleteUser } = UserController;

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/sign-up", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

// protected route
userRouter.get("/profile", protect, (req, res) => {
	res.json({
		success: true,
		message: "User profile fetched successfully.",
		user: req.user, //decoded JWT { userId }
	});
});

export default userRouter;

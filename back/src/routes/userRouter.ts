import { Router } from "express";
import { getUsersController, getUserByIdController, registerUserController, loginUserController } from "../controllers/userController";
import { validateUserRegisterData } from "../middlewares/auth";

const userRouter: Router = Router();

userRouter.get("/", getUsersController);

userRouter.get("/:id", getUserByIdController);

userRouter.post("/register", validateUserRegisterData, registerUserController);

userRouter.post("/login", loginUserController);

export default userRouter;






















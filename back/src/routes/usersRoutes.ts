import { Router } from "express";
import { createUser, getUsers, getUserById, deleteUser } from "../controllers/usersController";

const router: Router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUser);

export default router;













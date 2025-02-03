import { Router } from "express";
import { createUser, getUsers, getUserById, deleteUser } from "../controllers/usersController"; // Asegúrate de que las funciones sean exportadas correctamente
import auth from "../middlewares/auth";
const router: Router = Router();

router.get("/", auth, getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;


























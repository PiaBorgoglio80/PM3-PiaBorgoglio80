import { Router } from "express";
import usersRoutes from "./usersRoutes";
import appointmentsRoutes from "./appoinmentsRoutes"
const router: Router = Router();

router.use("/users", usersRoutes);
router.use("/appointments", appointmentsRoutes);

export default router;












// import {Router} from "express";
// import { createUser, getUsers, deleteUser } from "../controllers/usersController";
// import auth from "../middlewares/auth";

// const router: Router = Router();

// router.get("/users", auth, getUsers)

// router.post("/users", createUser)

// router.delete("/users", deleteUser)

// export default router;
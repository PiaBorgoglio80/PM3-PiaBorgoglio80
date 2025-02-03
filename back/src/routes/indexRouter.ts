import { Router } from "express";
import usersRoutes from "./usersRoutes";
import appointmentsRoutes from "./appointmentsRoutes";
import credentialsRoutes from "./credentialsRoutes"; 

const router: Router = Router();

router.use("/users", usersRoutes); 
router.use("/appointments", appointmentsRoutes); 
router.use("/credentials", credentialsRoutes); 

export default router;


















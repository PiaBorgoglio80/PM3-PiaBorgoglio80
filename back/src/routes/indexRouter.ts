import { Router } from "express";
import usersRoutes from "./userRouter";
import appointmentRouter from "./appointmentRouter";
import credentialRouter from "./credentialRouter"; 
import userRouter from "./userRouter";

const router: Router = Router();

router.use("/users", userRouter); 
router.use("/appointments", appointmentRouter); 
router.use("/credentials", credentialRouter); 

export default router;


















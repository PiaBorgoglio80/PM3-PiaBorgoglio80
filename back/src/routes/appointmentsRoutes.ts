import { Router } from "express";
import { getAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from "../controllers/appoinmentsControllers";

const router: Router = Router();

router.get("/", getAppointments); 
router.get("/:id", getAppointmentById); 
router.post("/schedule", scheduleAppointment); 
router.delete("/cancel", cancelAppointment); 

export default router;



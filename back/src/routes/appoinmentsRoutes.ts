import { Router } from "express";
import { getAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from "../controllers/appoinmentsControllers";

const router: Router = Router();

router.get("/appointments", getAppointments); 
router.get("/appointments/:id", getAppointmentById); 
router.post("/appointments/schedule", scheduleAppointment); 
router.put("/appointments/cancel", cancelAppointment);

export default router;

import { NextFunction, Router } from "express";
import { cancelStatusAppointmentsController, getAppointmentsController, getAppointmentByIdController, registerAppintmentController } from "../controllers/appoinmentsControllers";
import { Request, Response } from "express";
import { AppointmentRegisterDto } from "../dto/AppointmentDto";
import { validateAppointmentRegisterData } from "../middlewares/auth";

const appointmentRouter: Router = Router();


appointmentRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res));

appointmentRouter.get("/:id", (req: Request<{id: string}>, res: Response) => getAppointmentByIdController(req, res));

appointmentRouter.post("/schedule", 
    (req: Request, res: Response, next: NextFunction) => validateAppointmentRegisterData(req, res, next),
    (req: Request, res: Response) => registerAppintmentController(req, res));

appointmentRouter.put("/cancel/:id", (req: Request<{id: string}>, res: Response) => cancelStatusAppointmentsController(req, res));

export default appointmentRouter;



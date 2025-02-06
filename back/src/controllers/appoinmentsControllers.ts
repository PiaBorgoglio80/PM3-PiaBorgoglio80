
import { Request, Response } from "express";
import {
  getAppointmentsService,
  getAppointmentByIdService,
  createAppointmentService,
  cancelAppointmentService,
} from "../services/appointmentsService";
import { AppointmentDto } from "../dto/AppointmentDto";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAppointmentsService();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving appointments." });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid appointment ID." });
  }

  try {
    const appointment = await getAppointmentByIdService(id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving appointment." });
  }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
  const { userId, date, time, description } = req.body;

  if (!userId || !date || !time) {
    return res.status(400).json({ message: "User ID, date, and time are required." });
  }

  try {
    const appointment = await createAppointmentService({ userId, date, time, description });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error scheduling appointment." });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  const id = parseInt(req.body.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid appointment ID." });
  }

  try {
    await cancelAppointmentService(id);
    res.status(200).json({ message: "Appointment cancelled successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling appointment." });
  }
};

























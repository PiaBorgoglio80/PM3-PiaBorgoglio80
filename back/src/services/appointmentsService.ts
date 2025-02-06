import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments"; 
import { AppointmentDto } from "../dto/AppointmentDto"; 

const appointmentRepository = AppDataSource.getRepository(Appointment);

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  return appointmentRepository.find(); 
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
  const appointment = await appointmentRepository.findOneBy({
    id,
  });

  return appointment;
};

export const createAppointmentService = async (
  appointmentData: AppointmentDto
): Promise<Appointment> => {
  try {
    const newAppointment = appointmentRepository.create({
      userId: appointmentData.userId,
      date: new Date(`${appointmentData.date}T${appointmentData.time}`), 
      status: "scheduled", 
    });

    await appointmentRepository.save(newAppointment);
    return newAppointment;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating appointment.");
  }
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
  const appointment = await appointmentRepository.findOneBy({ id });

  if (!appointment) {
    throw new Error(`Appointment with ID ${id} not found.`);
  }

  appointment.status = "cancelled"; 
  await appointmentRepository.save(appointment);
};













































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
























// import { AppDataSource } from "../config/data-source";
// import { Appointment } from "../entities/Appointments";
// import { AppointmentDto } from "../dto/AppointmentDto";

// const appointmentRepository = AppDataSource.getRepository(Appointment);

// export const getAppointmentsService = async (): Promise<Appointment[]> => {
//   return await appointmentRepository.find();
// };

// export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
//   return await appointmentRepository.findOneBy({ id });
// };

// export const createAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment> => {
//   if (!appointmentData.userId || !appointmentData.date || !appointmentData.time) {
//     throw new Error("User ID, date, and time are required to create an appointment.");
//   }

//   const newAppointment = appointmentRepository.create({
//     userId: appointmentData.userId,
//     date: appointmentData.date,
//     time: appointmentData.time,
//     description: appointmentData.description,
//     status: "scheduled",
//   });

//   return await appointmentRepository.save(newAppointment);
// };

// export const cancelAppointmentService = async (id: number): Promise<void> => {
//   const appointment = await appointmentRepository.findOneBy({ id });

//   if (!appointment) {
//     throw new Error(`Appointment with ID ${id} not found.`);
//   }

//   appointment.status = "cancelled";
//   await appointmentRepository.save(appointment);
// };
































// import IAppointment from "../interfaces/IAppointments";

// let appointments: IAppointment[] = [
//   {
//     id: 1,
//     userId: 1,
//     date: new Date("2025-02-01T10:00:00"),
//     status: "scheduled",
//   },
// ];

// let appointmentId: number = 2;

// export const getAppointmentsService = async (): Promise<IAppointment[]> => {
//   return appointments;
// };

// export const getAppointmentByIdService = async (id: number): Promise<IAppointment | undefined> => {
//   return appointments.find((appointment) => appointment.id === id);
// };

// export const createAppointmentService = async (
//   userId: number,
//   date: Date
// ): Promise<IAppointment> => {
//   if (!userId) {
//     throw new Error("User ID is required to create an appointment.");
//   }

//   const newAppointment: IAppointment = {
//     id: appointmentId,
//     userId,
//     date,
//     status: "scheduled",
//   };

//   appointments.push(newAppointment);
//   appointmentId++;
//   return newAppointment;
// };

// export const cancelAppointmentService = async (id: number): Promise<void> => {
//   const appointment = appointments.find((appointment) => appointment.id === id);

//   if (!appointment) {
//     throw new Error(`Appointment with ID ${id} not found.`);
//   }

//   appointment.status = "cancelled";
// };

































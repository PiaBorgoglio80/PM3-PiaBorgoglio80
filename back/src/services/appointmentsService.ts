import { AppointmentRegisterDto } from "../dto/AppointmentDto";
import { IAppointment } from "../interfaces/IAppointments";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { getUserByIdService } from "./userService";
import { Status } from "../interfaces/IAppointments";
import { Appointment } from "../entities/Appoiintment.Entity";





export const registerAppointmentService = async (appointment: AppointmentRegisterDto):Promise< Appointment> => {



  
await getUserByIdService(appointment.userId.toString())

AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time)
await AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time)
const newAppointment = AppointmentRepository.create({
  date: appointment.date,
    time: appointment.time,
    user: {id: appointment.userId}
})

return await AppointmentRepository.save(newAppointment)
}

export const getAppointmentService = async ():Promise <Appointment[]> => {
  const appointment = await AppointmentRepository.find()
 if(appointment.length > 0) return appointment
 else throw new Error("No se encontraron citas")

}


export const getAppointmentByIdService = async (id: string):Promise< Appointment> => {

const appointmentFound = await AppointmentRepository.findOne({
  where:{
    id: parseInt(id, 10)
  }
})

if(!appointmentFound) throw new Error ( `La cita con ${id} no fue encontrada`)
  else return appointmentFound
}


export const cancelStatusAppointmentService = async(id: string):Promise <Appointment> => {

  const appointmentFound = await AppointmentRepository.findOne({
    where:{
      id: parseInt(id, 10)
    }
  })
  
  if(!appointmentFound) throw new Error ( `La cita con ${id} no fue encontrada`)
  appointmentFound.status = Status.Cancelled
return await AppointmentRepository.save(appointmentFound)
}




































import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appoiintment.Entity";

export const AppointmentRepository= AppDataSource.getRepository(Appointment).extend({
    
validateAllowAppointment: function(date: Date, time: string): void{

    const [hours, minutes] = time.split(":").map(Number)
    const appointmentDate = new Date(date)
    appointmentDate.setHours(hours, minutes, 0)
    const appointmentDateArg = new Date(appointmentDate.getTime() -3 * 60 *60 * 1000)
    const dateNowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)

    const diffMilliSeconds = new Date().getTime() - appointmentDate.getTime()
    const diffInHours = diffMilliSeconds / (1000 * 60 * 60)
    if(diffInHours > 24){
        throw new Error("No se pueden agendar citas con menos de 24 hs de antelacion")
    }


    if(appointmentDateArg < dateNowArg){
        throw new Error("No se pueden agendar citas correspondientes a fechas pasadas")
    }

    

    const dayOfWeek = appointmentDateArg.getUTCDay()
    if(dayOfWeek === 5 || dayOfWeek === 6){
        throw new Error("No se pueden agendar citas los fines de semana")
    }


    if(hours < 8 || hours > 17){
        throw new Error("Las citas no pueden agendarse fuera del horario: 8 am - 6 pm")
    }

},

validateExistingAppointment: async function(userId: number, date: Date, time: string):Promise< void>{
   const appointmentFound = await this.findOne({
    where: {
        user: {
          id: userId
        },
        date: date,
        time: time
      }
    })

    if(appointmentFound) throw new Error (`La cita con fecha: ${date}, y la hora: ${time}, para el usuario con id: ${userId}, ya existe`)
}



})
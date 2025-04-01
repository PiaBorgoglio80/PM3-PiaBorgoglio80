import { Request, Response } from "express"
import {AppointmentRegisterDto} from '../dto/AppointmentDto' //
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppointmentService, registerAppointmentService } from "../services/appointmentsService" //
import { PostgresError } from "../interfaces/ErrorInterface"


export const getAppointmentsController = (req: Request, res: Response ): void => { 
try{
 const response = getAppointmentService()
 res.status(200).json({

  message: "Obtener el listado de todos los turnos de todos los usuarios",
  data: response
})
} catch (error){
  res.status(404).json({
    message: "Error en el servidor",
    data: error instanceof Error ? error.message : `Error desconocido`
  })

}


}

export const getAppointmentByIdController = async (req: Request<{id: string}>, res: Response ):Promise <void> => {

  const {id} = req.params

  try{
    const response = await getAppointmentByIdService(id)
    res.status(200).json({
    message: "Obtener el detalle de un turno especifico: " + id,
    data: response
  })
  } catch (error){
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : `Error desconocido`
    })
  }

  
  }


  export const registerAppintmentController = async (req: Request<unknown, unknown, AppointmentRegisterDto >, res: Response):Promise< void> => {

    try{
      const response = await registerAppointmentService(req.body) 
      res.status(201).json({
      message: "Cita creada con exito",
      data: response
    })
    }catch (error){

      const err = error as PostgresError
      res.status(400).json({
        message: "Error en el servidor",
        data: err instanceof Error ? err.detail ? err.detail : err.message : `Error desconocido`
      })
    }
   
    }

    
  export const cancelStatusAppointmentsController = async (req: Request<{id: string}>, res: Response): Promise<void> => {

    const {id} = req.params
    try{
      const response = await cancelStatusAppointmentService(id)
       res.status(200).json({
      message: `Cambiar el estatus de un turno a "cancelled": ` + id,
      data: {}
    })
    } catch (error) {
      res.status(404).json({
        message: "Error en el servidor",
        data: error instanceof Error ? error.message : `Error desconocido`
      })
    }
   
    }























 
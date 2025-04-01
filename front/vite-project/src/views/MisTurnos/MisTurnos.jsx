import { useContext, useEffect, useState } from "react"
import myAppointments from "../../helpers/myAppointments"
import Styles from './MisTurnos.module.css'
import axios from "axios"
import { UsersContext } from "../../Context/UsersContext"

function MisTurnos(){


 const{userAppointments, getUserAppointments, user} = useContext(UsersContext)


  useEffect(() => {
    getUserAppointments(user)
    
  }, [user, getUserAppointments])

  return(
    <div className={Styles.contenedor}>
    <div className={Styles.contenedorH1}>
    <h1> Mis Turnos </h1>

    <div className={Styles.containerTurnos}>
    { userAppointments.length > 0 ? turnos.map(turno => {
        return(
          <Turno 
          key={turno.id}
          id={turno.id}
          date={turno.date}
          time={turno.time}
          status={turno.status}
          />
        )
    }) : <h1>No hay turnos disponibles</h1> }
    
    </div>  
    </div>
    </div>
)
  }


export default MisTurnos






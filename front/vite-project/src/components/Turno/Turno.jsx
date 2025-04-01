import { useContext } from 'react'
import Styles from './Turno.module.css'
import { UsersContext } from '../../Context/UsersContext'
import Swal from 'sweetalert2'

function Turno({id, date, time, status}){
  const {cancelUserAppointment} = useContext(UsersContext)
  const handleCancel = async () => {
    try{
      await cancelUserAppointment(id)
      Swal.fire({
        icon: "warning",
        color: "red",
        title: "Cita cancelada con exito"
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cancelar la cita, intente de nuevo"
      })
    }
    
  }
return(
  <div className={Styles.appointmentCard}>
    <div className={Styles.appointmentHeaer}>
      <h3>Turno #{id}</h3>
      <span className={status === 'Active' ? Styles.statusActive : Styles.statusInactive}>{status}</span>
    </div>
    <div className={Styles.appointmentDetails}>
      <p><strong>Fecha:</strong><span>{date}</span></p>
      <p><strong>Hora:</strong><span>{time}</span></p>
    </div>
    <button
    className={`${Styles.cancelButton} ${status === "cancelled" ? Styles.disabled : ""}`}
    onClick={handleCancel}
    disabled={satus === "canceled"}
    >
      Cancelar Turno
    </button>
  </div>
)
}

export default Turno




// import { useUser } from "../../Context/UserContext";
// import "./Turno.css"; 

// const Turno = ({ id, date, time, description }) => {
//   const { cancelAppointment } = useUser();

//   return (
//     <div className="turno-card">
//       <h4>Turno #{id}</h4>
//       <p>Fecha: {date}</p>
//       <p>Hora: {time}</p>
//       <p>Descripción: {description}</p>
//       <button onClick={() => cancelAppointment(id)}>Cancelar Turno</button>
//     </div>
//   );
// };

// export default Turno;


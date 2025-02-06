import { useUser } from "../../Context/UserContext";
import "./Turno.css"; 

const Turno = ({ id, date, time, description }) => {
  const { cancelAppointment } = useUser();

  return (
    <div className="turno-card">
      <h4>Turno #{id}</h4>
      <p>Fecha: {date}</p>
      <p>Hora: {time}</p>
      <p>Descripción: {description}</p>
      <button onClick={() => cancelAppointment(id)}>Cancelar Turno</button>
    </div>
  );
};

export default Turno;


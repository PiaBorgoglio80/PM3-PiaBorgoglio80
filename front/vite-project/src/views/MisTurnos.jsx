import { useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Turno from "../components/Turno/Turno";

const MisTurnos = () => {
  const { user, userAppointments } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <h1>Mis Turnos</h1>
      {userAppointments && userAppointments.length > 0 ? (        userAppointments.map((turno) => (
          <Turno
            key={turno.id}
            id={turno.id}
            date={turno.date}
            time={turno.time}
            description={turno.description || "Sin descripción"}
          />
        ))
      ) : (
        <p>No tienes turnos agendados.</p>
      )}
    </>
  );
};

export default MisTurnos;

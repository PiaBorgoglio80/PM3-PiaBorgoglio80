import { useState } from "react";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NuevoTurno = () => {
  const { user, setUserAppointments } = useUser();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError("Fecha y hora son obligatorios");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/appointments/schedule", {
        userId: user.id,
        date,
        time,
        description,
      });

      setUserAppointments((prevAppointments) => [
        ...prevAppointments,
        response.data, 
      ]);

      setDate("");
      setTime("");
      setDescription("");
      setError("");
      navigate("/mis-turnos"); 
    } catch (error) {
      console.error("Error al crear el turno", error);
      setError("Hubo un problema al crear el turno");
    }
  };

  return (
    <div>
      <h2>Nuevo Turno</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción del turno (opcional)"
        />
        <button type="submit">Crear Turno</button>
      </form>
    </div>
  );
};

export default NuevoTurno;

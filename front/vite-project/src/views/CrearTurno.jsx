import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CrearTurno = () => {
    const { user, userAppointments, setUserAppointments } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const [form, setForm] = useState({
        date: "",
        time: "",
        description: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.date || !form.time || !form.description) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const newAppointment = {
                ...form,
                userId: user.id,
            };

            const response = await axios.post("http://localhost:3001/appointments/schedule", newAppointment);

            setUserAppointments([...userAppointments, response.data]);

            navigate("/turnos"); 
        } catch (err) {
            console.error("Error al crear turno:", err);
            setError("Hubo un problema al crear el turno.");
        }
    };

    return (
        <div>
            <h2>Agendar Turno</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Fecha:</label>
                <input type="date" name="date" onChange={handleChange} value={form.date} />

                <label>Hora:</label>
                <input type="time" name="time" onChange={handleChange} value={form.time} />

                <label>Descripción:</label>
                <input type="text" name="description" placeholder="Descripción del turno" onChange={handleChange} value={form.description} />

                <button type="submit">Agendar</button>
            </form>
        </div>
    );
};

export default CrearTurno;



















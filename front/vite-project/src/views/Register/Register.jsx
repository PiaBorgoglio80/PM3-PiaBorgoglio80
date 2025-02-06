import "../Register/Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (Object.values(form).some(value => typeof value === "string" && value.trim() === "")) {
            return "Todos los campos son obligatorios.";
        }
        if (form.password.length < 8 || !/[A-Z]/.test(form.password)) {
            return "La contraseña debe tener al menos 8 caracteres y una mayúscula.";
        }
        if (form.password !== form.confirmPassword) {
            return "Las contraseñas no coinciden.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const formattedBirthdate = new Date(form.birthdate);  
        
        if (isNaN(formattedBirthdate.getTime())) {
            setError("Fecha de nacimiento inválida.");
            return;
        }

        const userData = { ...form, birthdate: formattedBirthdate, active: true };   
        console.log("Datos enviados al backend:", userData);

        try {
            const response = await axios.post("http://localhost:3001/credentials/register", userData);
            console.log("Usuario registrado:", response.data);
            setError("");
            navigate("/login"); 
        } catch (err) {
            console.error("Error en el registro:", err);
            setError("Hubo un problema al registrar el usuario.");
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre completo" onChange={handleChange} value={form.name} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} value={form.email} />
                <input type="date" name="birthdate" onChange={handleChange} value={form.birthdate} />
                <input type="text" name="nDni" placeholder="DNI" onChange={handleChange} value={form.nDni} />
                <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} value={form.username} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={form.password} />
                <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleChange} value={form.confirmPassword} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;

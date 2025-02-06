import "../Login/Login.css";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../Context/UserContext"; 
import { useNavigate } from "react-router-dom"; 
const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login } = useUser(); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("/credentials/login", form); 
      console.log("Respuesta del backend:", response);

      const { token, user } = response.data; 

      login(user, token);  
      setError("");    
      navigate("/turnos"); 
    } catch (err) {
      console.error("Error en el login:", err);
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          onChange={handleChange} 
          value={form.username} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          onChange={handleChange} 
          value={form.password} 
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;














import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import MisTurnos from "./views/MisTurnos";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import CrearTurno from "./views/CrearTurno";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/turnos" element={<MisTurnos />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/crear-turno" element={<CrearTurno />} /> {/* Agregar la ruta para Agendar Turno */}
      </Routes>
    </Router>
  );
}

export default App;








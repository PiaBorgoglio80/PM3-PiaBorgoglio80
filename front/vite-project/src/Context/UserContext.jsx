import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));  
  const [userAppointments, setUserAppointments] = useState([]);

  const login = (userData, token, appointments) => {
    setUser(userData);
    setToken(token);  
    localStorage.setItem("token", token);  
    setUserAppointments(appointments);
  };

  const logout = () => {
    setUser(null);
    setUserAppointments([]);
    setToken(null);
    localStorage.removeItem("token");  
  };

  axios.defaults.headers["Authorization"] = token ? `Bearer ${token}` : "";

  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${appointmentId}`);
      setUserAppointments((prev) =>
        prev.filter((turno) => turno.id !== appointmentId)
      );
    } catch (error) {
      console.error("Error al cancelar turno:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, userAppointments, token, login, logout, cancelAppointment }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };






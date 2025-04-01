import { createContext, useState } from "react"
import axios from "axios"


export const UsersContext = createContext({
  user: "",
  userAppointments: [],
  registerUser: async () => {},
  loginUser: async () => {},
  createdAppointment:  async () => {},
  getUserAppointments: async () => {},
  logOut:  () => {},
  cancelUserAppointment:  async () => {}

})

export const UsersProvider = ({children}) => {

    const [user, setUser] = useState(localStorage.getItem("user") || false)
    const [userAppointments, setUserAppointments] = useState([])

    const registerUser = async (userData) => {
    return await axios.post("http://localhost:3002/users/register", userData)
    
    }

    const loginUser = async (loginUser) => {
    const res = await axios.post(`http://localhost:3002/users/login`,loginUser)
    localStorage.setItem("user", res.data.user.id)
      setUser(res.data.user.id)
      return res
    }

      const logOut = () => {
        localStorage.removeItem("user")
        setUser(false)
        setUserAppointments([])
      }


      const createdAppointment = async (values) => {
        await axios.post(`http://localhost:3002/appointments/schedule`, values)
     }

     const getUserAppointments = async (userId) => {
     const {data} = await axios.get(`http://localhost:3002/users/${userId}`)
     setUserAppointments(data.appointments)
     
     }
    
     const cancelUserAppointment = async (appointmentId) => {
     await axios.put(`http://localhost:3002/appoinments/cancel/${appointmentId}`)
     const newAppointments = userAppointments.map((appointment) => appointment.id === appointmentId ? {...appointment, status: "cancelled"} : appointment)
     setUserAppointments(newAppointments)
    }


    const value = {
      user,
      userAppointments,
      registerUser,
      loginUser,
      logOut,
      createdAppointment,
     getUserAppointments,
     cancelUserAppointment

    }

    return(
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  )
}

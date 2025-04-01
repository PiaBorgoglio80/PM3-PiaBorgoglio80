import { Link, useNavigate } from 'react-router-dom';
import Styles from './Navbar.module.css'
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UsersContext } from '../../Context/UsersContext';


function Navbar(){
 const navigate = useNavigate()

 const {logOut} = useContext(UsersContext)

  const handleLogOut = () => {
    logOut()
    Swal.fire({
      icon: "warning",
      title: "Tu sesion fue cerrada correctamente!"
    })
    navigate("/login")
  }
  return (
   <div className={Styles.navbarContainer}>
    <nav className={Styles.navbar}>
      <li className={Styles.navItem}>
        <Link 
        to="/"
        className={`${Styles.navLink} ${location.pathname === "/" ? Styles.active : ""} `}
        >
          Home
        </Link>
      </li>

      <li className={Styles.navItem}>
        <Link
        to="/misturnos"
        className={`${Styles.navLink} ${location.pathname === "/misturnos" ? StyleSheet.active : ""}`}
      >
        Mis Turnos
        </Link>
      </li>

      <li className={Styles.navItem}>
        <Link
        to="/agendarturno"
        className={`${Styles.navLink} ${location.pathname === "/agendarturno" ? StyleSheet.active : ""}`}
      >
        Agendar Turno
        </Link>
      </li>

      <li className={Styles.navItem}>
        <Link
        to="/login"
        className={`${Styles.navLink} `}
        onClick={ handleLogOut}
      >
        Log Out
        </Link>
      </li>
    </nav>
   </div>
  )
}

export default Navbar;







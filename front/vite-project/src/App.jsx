import styles from './App.module.css'
 import MisTurnos from './views/MisTurnos/MisTurnos';
 import Home from '../src/views/Home/Home'
 import Register  from './views/Register/Register';
 import Login  from "./views/Login/Login";
 import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
 import { useContext, useEffect, useState } from 'react';
 import Navbar from './components/Navbar/Navbar';
 import NotFound from './components/NotFound/NotFound';
 import { UsersContext } from './Context/UsersContext';
 import AgendarTurno from './views/AgendarTurno/AgendarTurno';

 function App() {

   const [isNotFound, setIsNotFound] = useState(false)
   const {user} = useContext(UsersContext)

   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {

   if(!user && location.pathname !== "/login" && location.pathname !== "/register"){
       navigate("/login")
     }

     if(user && (location.pathname === "/login" || location.pathname === "/register")){
       navigate("/")
 }
       const validateRoutes = ["/", "/login", "/register", "/misturnos", "/agendarturno"]
     if(!validateRoutes.includes(location.pathname)) setIsNotFound(true)
       else setIsNotFound(false)

   }, [ user, navigate, location.pathname ])

   return(
     <>

     {
       !user ? (
          <main className={styles.main}>
        <Routes>
     <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
     </Routes>
     </main>
       ) : (
         <>
         {
           !isNotFound && (
             <header>
           <span>Logo</span>
           <Navbar />
         </header>
           )}    
        
         <main>
           <Routes>
         <Route path='/' element={<Home />}/>
         <Route path='/misturnos' element={<MisTurnos />}/>
         <Route path='/agendarturno' element={<AgendarTurno />}/>
         <Route path='*' element={<NotFound />}/>

       </Routes>
         </main>        
         </>
       )
     }
   
     </>
   ) 
 }

 export default App; 

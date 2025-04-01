import styles from './Login.module.css' 
import { loginFormValidates } from '../../helpers/validates/' 
import axios from 'axios' 
import Swal from 'sweetalert2' 
import { Link, useNavigate } from 'react-router-dom' 
import { useContext, useState } from 'react' 
import { UsersContext } from '../../Context/UsersContext' 
import { useFormik } from 'formik';  

function Login() {
  const {loginUser} = useContext(UsersContext)
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);
    
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidates,
    onSubmit: async (values) => {
      console.log("Formulario enviado", values);
      setIsSubmitting(true);
      
      try {
        const res = await loginUser(values);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Usuario logeado correctamente",
          });
          console.log(res.data);
          navigate("/");
        }
      } catch (err) {
        console.error("Error completo:", err);
        
        if (err.response && err.response.data) {
          if (err.response.data.code === 400 && err.response.data.details){
            Swal.fire({
              icon: "error",
              title: `${err.response.data.details}`,
              text: "Intentalo de nuevo"
            });
          } else if(err.response.data.message){
            Swal.fire({
              icon: "error",
              title: `${err.response.data.message}`,
              text: "Intentalo de nuevo"
            });
          } else {
            // Error genérico
            Swal.fire({
              icon: "error",
              title: "Error al iniciar sesión",
              text: "Verifica tus credenciales e intenta nuevamente"
            });
          }
        } else {
          // Error de conexión
          Swal.fire({
            icon: "error",
            title: "Error al conectar con el servidor",
            text: "Por favor, intenta más tarde"
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });
 
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <h2>Formulario de Login</h2>
        
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className={styles.errorText}>{formik.errors.username}</div>
          ) : null }
        </div>
        
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className={styles.errorText}>{formik.errors.password}</div>
          ) : null}
        </div>
        
        <button 
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Procesando..." : "Iniciar sesión"}
        </button>
        
        <div className={styles.registerLink}>
          <p>Aun no tienes una cuenta?</p>
          <Link to="/register">Registrate!</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;










// import styles from './Login.module.css'
// import { loginFormValidates } from '../../helpers/validates/'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { Link, useNavigate } from 'react-router-dom'
// import { useContext, useState } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { useFormik } from 'formik';

// function Login() {
//   const {loginUser} = useContext(UsersContext)
//   const navigate = useNavigate()
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     validate: loginFormValidates,
//     onSubmit: (values) => {
//       console.log("Formulario enviado", values);
//       setIsSubmitting(true);
      
//       loginUser(values)
//       .then((res) => {
//         if (res.status === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Usuario logeado correctamente",
//           });
//           console.log(res.data);
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.error("Error completo:", err);
        
//         if (err.response && err.response.data) {
//           if (err.response.data.code === 400 && err.response.data.details){
//             Swal.fire({
//               icon: "error",
//               title: `${err.response.data.details}`,
//               text: "Intentalo de nuevo"
//             });
//           } else if(err.response.data.message){
//             Swal.fire({
//               icon: "error",
//               title: `${err.response.data.message}`,
//               text: "Intentalo de nuevo"
//             });
//           } else {
//             // Error genérico
//             Swal.fire({
//               icon: "error",
//               title: "Error al iniciar sesión",
//               text: "Verifica tus credenciales e intenta nuevamente"
//             });
//           }
//         } else {
//           // Error de conexión
//           Swal.fire({
//             icon: "error",
//             title: "Error al conectar con el servidor",
//             text: "Por favor, intenta más tarde"
//           });
//         }
//       })
//       .finally(() => {
//         setIsSubmitting(false);
//       });
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submit manual", formik.values);
//     formik.handleSubmit();
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         <h2>Formulario de Login</h2>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.username}
//           />
//           {formik.errors.username && formik.touched.username ? (
//             <div className={styles.errorText}>{formik.errors.username}</div>
//           ) : null }
//         </div>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           {formik.errors.password && formik.touched.password ? (
//             <div className={styles.errorText}>{formik.errors.password}</div>
//           ) : null}
//         </div>
        
//         <button 
//           type="submit"
//           className={styles.submitButton}
//           disabled={isSubmitting}
//         >
//           Submit
//         </button>
        
//         <div className={styles.registerLink}>
//           <p>Aun no tienes una cuenta?</p>
//           <Link to="/register">Registrate!</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;











// import styles from './Login.module.css'
// import { loginFormValidates } from '../../helpers/validates/'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { Link, useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { useFormik } from 'formik';

// function Login() {
//   const {loginUser} = useContext(UsersContext)
//   const navigate = useNavigate()
  
//   // Agregar función navigateToRegister
//   const navigateToRegister = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/register');
//   };
  
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     initialErrors: {
//       username: "username is required",
//       password:"password is required"
//     },
//     validate: loginFormValidates,
//     onSubmit: (values, { setSubmitting }) => {
//       loginUser(values)
//       .then((res) => {
//         if (res.status === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Usuario logeado correctamente",
//           });
//           console.log(res.data);
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         console.error("Error completo:", err);
        
//         if (err.response && err.response.data) {
//           if (err.response.data.code === 400 && err.response.data.details){
//             Swal.fire({
//               icon: "error",
//               title: `${err.response.data.details}`,
//               text: "Intentalo de nuevo"
//             });
//           } else if(err.response.data.message){
//             Swal.fire({
//               icon: "error",
//               title: `${err.response.data.message}`,
//               text: "Intentalo de nuevo"
//             });
//           } else {
//             // Error genérico
//             Swal.fire({
//               icon: "error",
//               title: "Error al iniciar sesión",
//               text: "Verifica tus credenciales e intenta nuevamente"
//             });
//           }
//         } else {
//           // Error de conexión
//           Swal.fire({
//             icon: "error",
//             title: "Error al conectar con el servidor",
//             text: "Por favor, intenta más tarde"
//           });
//         }
//       })
//       .finally(() => {
//         setSubmitting(false);
//       });
//     },
//   });

//   return (
//     <div className={styles.loginContainer}>
//       <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
//         <h2>Formulario de Login</h2>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.username}
//           />
//           {formik.errors.username && formik.touched.username ? (
//             <div className={styles.errorText}>{formik.errors.username}</div>
//           ) : null }
//         </div>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           {formik.errors.password && formik.touched.password ? (
//             <div className={styles.errorText}>{formik.errors.password}</div>
//           ) : null}
//         </div>
        
//         <button 
//           type="submit" 
//           className={styles.submitButton} 
//           disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
//         >
//           Submit
//         </button>
        
//         <div className={styles.registerLink}>
//           <p>Aun no tienes una cuenta?</p>
//           <Link to="/register" onClick={(e) => {e.stopPropagation();}}>Registrate!</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// // Asegúrate de que esta línea esté presente y correcta
// export default Login;











// import styles from './Login.module.css'
// import { loginFormValidates } from '../../helpers/validates/'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { Link, useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { useFormik } from 'formik';

// function Login() {
//   const {loginUser} = useContext(UsersContext)
//   const navigate = useNavigate()
  
//   // Agregar función navigateToRegister
//   const navigateToRegister = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/register');
//   };
  
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     initialErrors: {
//       username: "username is required",
//       password:"password is required"
//     },
//     validate: loginFormValidates,
//     onSubmit: (values, { setSubmitting }) => {
//       // Prevenir comportamiento por defecto
      
//       loginUser(values)
//       .then((res) => {
//         if (res.status === 200)
//           Swal.fire({
//             icon: "success",
//             title: "Usuario logeado correctamente",
//           });
//         console.log(res.data);
//         navigate("/")
//       })
//       .catch((err) => {
//         if (err.response.data.code === 400){
//           Swal.fire({
//             icon: "error",
//             title: `${err.response.data.details}`,
//             text: "Intentalo de nuevo"
//           });
//         } else if(err.response.data.message){
//           Swal.fire({
//             icon: "error",
//             title: `${err.response.data.message}`,
//             text: "Intentalo de nuevo"
//           });
//         }
//       })
//       .finally(() => {
//         setSubmitting(false);
//       });
//     },
//   });

//   return (
//     <div className={styles.loginContainer}>
//       <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
//         <h2>Formulario de Login</h2>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.username}
//           />
//           {formik.errors.username && formik.touched.username ? (
//             <div className={styles.errorText}>{formik.errors.username}</div>
//           ) : null }
//         </div>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           {formik.errors.password && formik.touched.password ? (
//             <div className={styles.errorText}>{formik.errors.password}</div>
//           ) : null}
//         </div>
        
//         <button 
//           type="submit" 
//           className={styles.submitButton} 
//           disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
//         >
//           Submit
//         </button>
        
//         <div className={styles.registerLink}>
//           <p>Aun no tienes una cuenta?</p>
//           <Link to="/register" onClick={(e) => {e.stopPropagation();}}>Registrate!</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;




























//import styles from './Login.module.css'
//import { loginFormValidates } from '../../helpers/validates/'
//import axios from 'axios'
//import Swal from 'sweetalert2'
//import { Link, useNavigate } from 'react-router-dom'
//import { useContext } from 'react'
//import { UsersContext } from '../../Context/UsersContext'
//import { useFormik } from 'formik';

//function Login() {
  //const {loginUser} = useContext(UsersContext)
  //const navigate = useNavigate()
  
  // Agregar función navigateToRegister
  //const navigateToRegister = (e) => {
    //e.preventDefault();
    //e.stopPropagation();
    //navigate('/register');
  //};
  
 // const formik = useFormik({
   // initialValues: {
     // username: "",
      //password: "",
    //},
    //initialErrors: {
      //username: "username is required",
      //password:"password is required"
    //},
    //validate: loginFormValidates,
    //onSubmit: (values, { setSubmitting }) => {
      // Prevenir comportamiento por defecto
      
      // loginUser(values)
      // .then((res) => {        
      //   if (res.status === 200)
      //     Swal.fire({
      //       icon: "success",
      //       title: "Usuario logeado correctamente",
      //     });
      //   console.log(res.data);
      //   navigate("/")
      // })
      // .catch((err) => {
      //   if (err.response.data.code === 400){
      //     Swal.fire({
      //       icon: "error",
      //       title: `${err.response.data.details}`,
      //       text: "Intentalo de nuevo"
      //     });
      //   } else if(err.response.data.message){
      //     Swal.fire({
      //       icon: "error",
      //       title: `${err.response.data.message}`,
      //       text: "Intentalo de nuevo"
      //     });
      //   }
      // })
  //     .finally(() => {
  //       setSubmitting(false);
  //     });
  //   },
  // });

  // return (
  //   <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
  //     <h2 className={styles.formTitle}>Formulario de Login</h2>
      
  //     <div className={styles.formGroup}>
  //       <label className={styles.formLabel}>Username:</label>
  //       <input
  //         className={styles.formInput}
  //         type="text"
  //         name="username"
  //         placeholder="Tu nombre de usuario"
  //         onChange={formik.handleChange}
  //         onBlur={formik.handleBlur}
  //         value={formik.values.username}
  //       />
  //       {formik.errors.username && formik.errors.username ?(
  //         <label className={styles.formLabel}>{formik.errors.username}</label>
  //       ) : null }
  //     </div>
      
  //     <div className={styles.formGroup}>
  //       <label className={styles.formLabel}>Password:</label>
  //       <input
  //         className={styles.formInput}
  //         type="password"
  //         name= "password"
  //         placeholder="*****"
  //         onChange={formik.handleChange}
  //         onBlur={formik.handleBlur}
  //         value={formik.values.password}
  //       />
  //       {formik.errors.password && formik.errors.password ? (
  //         <label className={styles.errorLabel}>{formik.errors.password}</label>
  //       ) : null}
  //     </div>
      
  //     <button 
  //       className={styles.formButton} 
  //       type="submit" 
  //       disabled={Object.keys(formik.errors).length > 0}
  //     >
  //       Submit
  //     </button>
      
  //     <br />
      
      {/* Opción 1: Usando Link con stopPropagation */}
      {/* <div className={styles.registerLink}>
        <span>Aun no tienes una cuenta? </span>
        <Link to="/register" onClick={(e) => {e.stopPropagation();}}>Registrate!</Link>
      </div> */}
      
      {/* Opción 2: Usando botón con navigateToRegister 
      <div className={styles.registerLink}>
        <span>Aun no tienes una cuenta? </span>
        <button type="button" onClick={navigateToRegister} className={styles.linkButton}>
          Registrate!
        </button>
      </div>
      */}
    {/* </form>
  );
};

export default Login; */}














// import { useFormik, userFormik } from 'formik'
// import styles from './Login.module.css'
//  import { loginFormValidates } from '../../helpers/validates/'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { Link, useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { useFormik } from 'formik';  


// function Login() {
//   const {loginUser} = useContext(UsersContext)

//  const navigate = useNavigate()
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     initialErrors: {
//       username: "username is required",
//       password:"password is required"
//     },
//     validate: loginFormValidates,
//     onSubmit: (values) => {
//       loginUser(values)
//       .then((res) => {
        
//          if (res.status === 200)
//           Swal.fire({
//         icon: "success",
//         title: "Usuario logeado correctamente",
//         });
//         console.log(res.data);

//       navigate("/") 
//       })
//       .catch((err) => {
//         if (err.response.data.code === 400){
//           Swal.fire({
//             icon: "error",
//             title: `${err.response.data.details}`,
//             text: "Intentalo de nuevo"
//       });
//     } else if(err.response.data.message){
//       Swal.fire({
//         icon: "error",
//         title: `${err.response.data.message}`,
//         text: "Intentalo de nuevo"
//   });
//     }
//       });
//     },
//   });

//   return (
//     <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
//       <h2 className={styles.formTitle}>Formulario de Login</h2>

//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Username:</label>
//         <input
//         className={styles.formInput}
//         type="text"
//         name="username"
//         placeholder="Tu nombre de usuario"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.username}
//         />
//         {formik.errors.username && formik.errors.username ?(
//           <label className={styles.formLabel}>{formik.errors.username}</label>
//         ) : null }
//       </div>

//       <div className={styles.formGroup}>
//         <label className={styles.formLabel}>Password:</label>
//         <input
//         className={styles.formInput}
//         type="password"
//         name= "password"
//         placeholder="*****"
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values.password}
//         />
//         {formik.errors.password && formik.errors.password ? (
//           <label className={styles.errorLabel}>{formik.errors.password}</label>
//         ) : null}
//       </div>

//       <button
//   className={styles.formButton}
//   type="submit"
//   disabled={Object.keys(formik.errors).length > 0}
// >
//   Submit
// </button>

//       <br />
      {/* { <label>
        Aun no tienes una cuenta ? <Link to="/register">Registrate!</Link>
      </label> } */}
//       <div className={styles.registerLink}>
//   <span>Aun no tienes una cuenta? </span>
//   <Link to="/register" onClick={(e) => {e.stopPropagation();}}>Registrate!</Link>
// </div>
//     </form>
//   );
// };

// export default Login;











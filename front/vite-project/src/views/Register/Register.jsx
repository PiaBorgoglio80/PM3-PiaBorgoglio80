import styles from './Register.module.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    nDni: "",
    username: "",
    password: ""
  });
  
  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando formulario:", formData);
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Campos requeridos",
        text: "Por favor completa todos los campos obligatorios"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:3002/users/register", formData);
      console.log("Respuesta del servidor:", res);
      
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso!",
          text: "Ahora puedes iniciar sesión.",
          willClose: () => {
            navigate("/login");
          }
        });
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: err.response?.data?.message || "Hubo un problema al procesar tu solicitud."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Formulario de Registro</h2>

      <div className={styles.formGroup}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name} 
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>DNI:</label>
        <input
          type="text"
          name="nDni"
          value={formData.nDni}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        className={styles.formButton}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Registrarse"}
      </button>
      
      <div className={styles.loginLink}>
        <p>¿Ya tienes una cuenta?</p>
        <Link to="/login">Inicia sesión</Link>
      </div>
    </form>
  );
}

export default Register;









// import styles from './Register.module.css'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useNavigate, Link } from 'react-router-dom'
// import { useState } from 'react'

// function Register() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     birthDate: "",
//     nDni: "",
//     username: "",
//     password: ""
//   });
  
//   // Manejar cambios en los inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
//   // Manejar el envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Enviando formulario:", formData);
    
//     // Validación básica
//     if (!formData.name || !formData.email || !formData.username || !formData.password) {
//       Swal.fire({
//         icon: "error",
//         title: "Campos requeridos",
//         text: "Por favor completa todos los campos obligatorios"
//       });
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const res = await axios.post("http://localhost:3002/users/register", formData);
//       console.log("Respuesta del servidor:", res);
      
//       if (res.status === 201) {
//         Swal.fire({
//           icon: "success",
//           title: "Registro exitoso!",
//           text: "Ahora puedes iniciar sesión.",
//         });
        
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error("Error al registrar:", err);
      
//       Swal.fire({
//         icon: "error",
//         title: "Error en el registro",
//         text: err.response?.data?.message || "Hubo un problema al procesar tu solicitud."
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <form className={styles.formContainer} onSubmit={handleSubmit}>
//       <h2 className={styles.formTitle}>Formulario de Registro</h2>

//       <div className={styles.formGroup}>
//         <label>Nombre:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Fecha de nacimiento:</label>
//         <input
//           type="date"
//           name="birthDate"
//           value={formData.birthDate}
//           onChange={handleChange}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>DNI:</label>
//         <input
//           type="text"
//           name="nDni"
//           value={formData.nDni}
//           onChange={handleChange}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <button
//         className={styles.formButton}
//         type="submit"
//         disabled={isLoading}
//       >
//         {isLoading ? "Procesando..." : "Registrarse"}
//       </button>
      
//       <div className={styles.loginLink}>
//         <p>¿Ya tienes una cuenta?</p>
//         <Link to="/login">Inicia sesión</Link>
//       </div>
//     </form>
//   );
// }

// export default Register;




// import styles from './Register.module.css'
// import { registerFormValidates } from '../../helpers/validates/'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useNavigate, Link } from 'react-router-dom'
// import { useState } from 'react'
// import { useFormik } from 'formik';

// function Register() {
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       birthDate: "",
//       nDni: "",
//       username: "",
//       password: "",
//     },
//     validate: registerFormValidates,
//     onSubmit: async (values) => {
//       console.log("Formulario enviado", values);
//       setIsSubmitting(true);
      
//       try {
//         console.log("Enviando datos al servidor:", values);
//         const res = await axios.post("http://localhost:3002/users/register", values);
        
//         if (res.status === 201) {
//           Swal.fire({
//             icon: "success",
//             title: "Registro exitoso!",
//             text: "Ahora puedes iniciar sesión.",
//           });
          
//           console.log("Redirigiendo al login...");
//           navigate("/login");
//         }
//       } catch (err) {
//         console.error("Error en el registro:", err);
        
//         if (err.response && err.response.data) {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: err.response.data.message || "Algo salió mal. Intenta nuevamente.",
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Error de conexión",
//             text: "No se pudo conectar con el servidor.",
//           });
//         }
//       } finally {
//         setIsSubmitting(false);
//       }
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submit manual", formik.values);
//     formik.handleSubmit();
//   };
  
//   return (
//     <form className={styles.formContainer} onSubmit={handleSubmit}>
//       <h2 className={styles.formTitle}>Formulario de Registro</h2>

//       <div className={styles.formGroup}>
//         <label>Nombre:</label>
//         <input
//           type="text"
//           name="name"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.name}
//         />
//         {formik.errors.name && formik.touched.name && (
//           <label className={styles.errorLabel}>{formik.errors.name}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />
//         {formik.errors.email && formik.touched.email && (
//           <label className={styles.errorLabel}>{formik.errors.email}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Fecha de nacimiento:</label>
//         <input
//           type="date"
//           name="birthDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.birthDate}
//         />
//         {formik.errors.birthDate && formik.touched.birthDate && (
//           <label className={styles.errorLabel}>{formik.errors.birthDate}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>DNI:</label>
//         <input
//           type="text"
//           name="nDni"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.nDni}
//         />
//         {formik.errors.nDni && formik.touched.nDni && (
//           <label className={styles.errorLabel}>{formik.errors.nDni}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.username}
//         />
//         {formik.errors.username && formik.touched.username && (
//           <label className={styles.errorLabel}>{formik.errors.username}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         {formik.errors.password && formik.touched.password && (
//           <label className={styles.errorLabel}>{formik.errors.password}</label>
//         )}
//       </div>

//       <button
//         className={styles.formButton}
//         type="submit"
//         disabled={isSubmitting}
//       >
//         Submit
//       </button>
      
//       <div className={styles.loginLink}>
//         <p>¿Ya tienes una cuenta?</p>
//         <Link to="/login">Inicia sesión</Link>
//       </div>
//     </form>
//   );
// }

// export default Register;



















// import styles from './Register.module.css'
// import { registerFormValidates } from '../../helpers/validates/'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { useFormik } from 'formik';

// function Register() {
//   const navigate = useNavigate(); // Para la redirección

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       birthDate: "",
//       nDni: "",
//       username: "",
//       password: "",
//     },
//     validate: registerFormValidates,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         console.log("Enviando datos al servidor:", values); // Verificar qué datos se envían
//         const res = await axios.post("http://localhost:3002/users/register", values);

//         if (res.status === 201) {
//           Swal.fire({
//             icon: "success",
//             title: "Registro exitoso!",
//             text: "Ahora puedes iniciar sesión.",
//           });

//           console.log("Redirigiendo al login...");
//           navigate("/login"); // 🔥 REDIRECCIÓN AL LOGIN
//         }
//       } catch (err) {
//         console.error("Error en el registro:", err);
        
//         if (err.response && err.response.data) {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: err.response.data.message || "Algo salió mal. Intenta nuevamente.",
//           });
//         }
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
//       <h2 className={styles.formTitle}>Formulario de Registro</h2>

//       <div className={styles.formGroup}>
//         <label>Nombre:</label>
//         <input
//           type="text"
//           name="name"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.name}
//         />
//         {formik.errors.name && formik.touched.name && (
//           <label className={styles.errorLabel}>{formik.errors.name}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//         />
//         {formik.errors.email && formik.touched.email && (
//           <label className={styles.errorLabel}>{formik.errors.email}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Fecha de nacimiento:</label>
//         <input
//           type="date"
//           name="birthDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.birthDate}
//         />
//         {formik.errors.birthDate && formik.touched.birthDate && (
//           <label className={styles.errorLabel}>{formik.errors.birthDate}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>DNI:</label>
//         <input
//           type="text"
//           name="nDni"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.nDni}
//         />
//         {formik.errors.nDni && formik.touched.nDni && (
//           <label className={styles.errorLabel}>{formik.errors.nDni}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.username}
//         />
//         {formik.errors.username && formik.touched.username && (
//           <label className={styles.errorLabel}>{formik.errors.username}</label>
//         )}
//       </div>

//       <div className={styles.formGroup}>
//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         />
//         {formik.errors.password && formik.touched.password && (
//           <label className={styles.errorLabel}>{formik.errors.password}</label>
//         )}
//       </div>

//       <button
//         className={styles.formButton}
//         type="submit"
//         disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
//       >
//         Submit
//       </button>
//     </form>
//   );
// }

// export default Register;













// import { registerFormValidates } from '../../helpers/validates'
// import styles from './Register.module.css'
// import { useFormik } from 'formik'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useContext, useState } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { Link, useNavigate } from 'react-router-dom'

// const Register = () => {
//   const { registerUser } = useContext(UsersContext);
//   const navigate = useNavigate();
//   const [debugError, setDebugError] = useState(null);
  
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       birthDate: "",
//       nDni: "",
//       username: "",
//       password: ""
//     },
//     validate: registerFormValidates,
//     initialErrors: {
//       name: "Name is required",
//       email: "Email is required",
//       birthDate: "Birthdate is required",
//       nDni: "nDni is required",
//       username: "Username is required",
//       password: "Password is required"
//     },
//     onSubmit: (values, { setSubmitting }) => {
//       console.log("Datos envias al back", values);
      
//       // Llamar directamente a axios en lugar de usar registerUser para depurar
//       axios.post("http://localhost:3002/users/register", values)
//         .then((res) => {
//           if(res.status === 201){
//             Swal.fire({
//               icon: "success",
//               title: "User register successful"
//             });
//             formik.resetForm();
//             navigate('/login');
//           }
//         })
//         .catch((err) => {
//           console.error("Error completo:", err);
//           // Guardar el error para depuración
//           setDebugError({
//             message: err.message,
//             data: err.response ? err.response.data : null,
//             status: err.response ? err.response.status : null
//           });
          
//           // Mostrar un mensaje genérico de error
//           Swal.fire({
//             icon: "error",
//             title: "Error al registrar usuario",
//             text: "Verifique sus datos e intente nuevamente"
//           });
//         })
//         .finally(() => {
//           setSubmitting(false);
//         });
//     }
//   });

//   return (
//     <div className={styles.registerContainer}>
//       <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
//         <h2>Formulario de Registro</h2>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="name">Nombre:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.name}
//           />
//           {formik.errors.name && formik.touched.name && (
//             <div className={styles.errorText}>{formik.errors.name}</div>
//           )}
//         </div>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.errors.email && formik.touched.email && (
//             <div className={styles.errorText}>{formik.errors.email}</div>
//           )}
//         </div>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="birthDate">Fecha de Nacimiento:</label>
//           <input
//             type="date"
//             id="birthDate"
//             name="birthDate"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.birthDate}
//           />
//           {formik.errors.birthDate && formik.touched.birthDate && (
//             <div className={styles.errorText}>{formik.errors.birthDate}</div>
//           )}
//         </div>
        
//         <div className={styles.inputContainer}>
//           <label htmlFor="nDni">nDni:</label>
//           <input
//             type="text"
//             id="nDni"
//             name="nDni"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.nDni}
//           />
//           {formik.errors.nDni && formik.touched.nDni && (
//             <div className={styles.errorText}>{formik.errors.nDni}</div>
//           )}
//         </div>
        
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
//           {formik.errors.username && formik.touched.username && (
//             <div className={styles.errorText}>{formik.errors.username}</div>
//           )}
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
//           {formik.errors.password && formik.touched.password && (
//             <div className={styles.errorText}>{formik.errors.password}</div>
//           )}
//         </div>
        
//         <button 
//           type="submit" 
//           className={styles.submitButton} 
//           disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}
//         >
//           Submit
//         </button>
        
//         <div className={styles.loginLink}>
//           <p>Ya tienes una cuenta?</p>
//           <Link to="/login">Login!</Link>
//         </div>
//       </form>
      
//       {/* Información de depuración */}
//       {debugError && (
//         <div style={{ marginTop: '20px', border: '1px solid red', padding: '10px', backgroundColor: '#ffeeee' }}>
//           <h3>Información de depuración:</h3>
//           <p><strong>Mensaje:</strong> {debugError.message}</p>
//           <p><strong>Estado:</strong> {debugError.status}</p>
//           <p><strong>Datos:</strong></p>
//           <pre>{JSON.stringify(debugError.data, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;























// import { registerFormValidates } from '../../helpers/validates'
// import styles from './Register.module.css'
// import { useFormik } from 'formik'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useContext } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { Link, useNavigate } from 'react-router-dom'

// const Register = () => {
//   const { registerUser } = useContext(UsersContext);
//   const navigate = useNavigate();
  
//   // Función para navegar al login
//   const navigateToLogin = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/login');
//   };
  
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       birthDate: "",
//       nDni: "",
//       username: "",
//       password: ""
//     },
//     validate: registerFormValidates,
//     initialErrors: {
//       name: "Name is required",
//       email: "Email is required",
//       birthDate: "Birthdate is required",
//       nDni: "nDni is required",
//       username: "Username is required",
//       password: "Password is required"
//     },
//     onSubmit: (values, { setSubmitting }) => {
//       // Prevenir comportamiento por defecto
      
//       console.log("Datos envias al back", values);
//       registerUser(values)
//         .then((res) => {
//           if(res.status === 201){
//             Swal.fire({
//               icon: "success",
//               title: "User register successful"
//             });
//             formik.resetForm();
//             // Opcional: Redirigir al login después del registro exitoso
//             navigate('/login');
//           }
//         })
//         .catch((err) => {
//           if(err.response.data.details.includes("email")) {
//             Swal.fire({
//               icon: "error",
//               title: `Ya existe un usuario con el mail: ${formik.values.email}`,
//               text: "Intentelo nuevamente"
//             });
//           } else if(err.response.data.details.includes("username")) {
//             Swal.fire({
//               icon: "error",
//               title: `Ya existe un usuario con el username: ${formik.values.username}`,
//               text: "Intentelo nuevamente"
//             });
//           } else if(err.response.data.details.includes("nDni")) {
//             Swal.fire({
//               icon: "error",
//               title: `Ya existe un usuario con el nDni: ${formik.values.nDni}`,
//               text: "Intentelo nuevamente"
//             });
//           }
//         })
//         .finally(() => {
//           setSubmitting(false);
//         });
//     }
//   });

//   return (
//     <div className={styles.registerContainer}>
//       <div className={styles.registerForm}>
//         <h2>Formulario de Registro</h2>
//         <form onSubmit={formik.handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="name">Nombre:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.name}
//             />
//             {formik.errors.name && formik.touched.name && (
//               <div className={styles.error}>{formik.errors.name}</div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//             />
//             {formik.errors.email && formik.touched.email && (
//               <div className={styles.error}>{formik.errors.email}</div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="birthDate">Fecha de Nacimiento:</label>
//             <input
//               type="date"
//               id="birthDate"
//               name="birthDate"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.birthDate}
//             />
//             {formik.errors.birthDate && formik.touched.birthDate && (
//               <div className={styles.error}>{formik.errors.birthDate}</div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="nDni">nDni:</label>
//             <input
//               type="text"
//               id="nDni"
//               name="nDni"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.nDni}
//             />
//             {formik.errors.nDni && formik.touched.nDni && (
//               <div className={styles.error}>{formik.errors.nDni}</div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.username}
//             />
//             {formik.errors.username && formik.touched.username && (
//               <div className={styles.error}>{formik.errors.username}</div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//             />
//             {formik.errors.password && formik.touched.password && (
//               <div className={styles.error}>{formik.errors.password}</div>
//             )}
//           </div>

//           <button 
//             type="submit" 
//             className={styles.submitButton}
//             disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
//           >
//             Submit
//           </button>
          
//           <div className={styles.loginLink}>
//             <p>Ya tienes una cuenta? <a href="#" onClick={navigateToLogin}>Login!</a></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



// import { registerFormValidates } from '../../helpers/validates'
// import styles from './Register.module.css'
// import { useFormik } from 'formik'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useContext } from 'react'
// import { UsersContext } from '../../Context/UsersContext'
// import { Link } from 'react-router-dom'


// const Register = () => {

//     const { registerUser } = useContext(UsersContext) 
//    console.log(registerUser); 

//     const formik = useFormik({
//          initialValues: {
//              name: "",
//              email: "",
//              birthDate: "",
//              nDni: "",
//              username: "",
//              password: "",
//          },
//          validate: registerFormValidates,
//          initialErrors: {
//              name: "Name is required",
//              email: "Email is required",
//              birthDate: "Birthdate is required",
//              nDni: "nDni is required",
//              username: "Username is required",
//              password: "Password is required"
//          },
//          onSubmit: (values) => {
//             console.log("Datos envias al back", values)
//             registerUser(values)
             
//              .then((res) => {
//                  if(res.status === 201){
//                      Swal.fire({
//                          icon: "success",
//                          title: "User register successful"
//                      });
//                      formik.resetForm();
//                  }
//              })
//              .catch((err) => {
//                  if(err.response.data.details.includes("email")) {
//                      Swal.fire({
//                          icon: "error",
//                          title: `Ya existe un usuario con el mail: ${formik.values.email}`,
//                          text: "Intentelo nuevamente"
//                      });
//                  } else if(err.response.data.details.includes("username")) {
//                      Swal.fire({
//                          icon: "error",
//                          title: `Ya existe un usuario con el username: ${formik.values.username}`,
//                          text: "Intentelo nuevamente"
//                      });
//                  } else if(err.response.data.details.includes("nDni")) {
//                      Swal.fire({
//                          icon: "error",
//                          title: `Ya existe un usuario con el nDni: ${formik.values.nDni}`,
//                          text: "Intentelo nuevamente"
//                      });
//                  }
//              });
//          }
//      });
 
//      return (
//        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
//          <h2 className={styles.formTitle}>Formulario de Registro</h2>
 
//          <div className={styles.formGroup}>
//              <label className={styles.formLabel}>Nombre:</label>
//              <input
//                  className={styles.formInput}
//                  type="text"
//                  name="name"
//                  placeholder="tu nombre"
//                  onChange={formik.handleChange}
//                  value={formik.values.name}
//              />
//              <label className={styles.errorLabel}>{formik.errors.name || ""}</label>
//          </div>
 
//          <div className={styles.formGroup}>
//              <label className={styles.formLabel}>Email:</label>
//              <input
//                  className={styles.formInput}
//                  type="text"
//                  name="email"
//                  placeholder="mail@mail.com"
//                  onChange={formik.handleChange}
//                  value={formik.values.email}
//              />
//              {formik.errors.email && (
//                  <label className={styles.errorLabel}>{formik.errors.email}</label>
//              )}
//          </div>
 
//          <div className={styles.formGroup}>
//              <label className={styles.formLabel}>Fecha de Nacimiento:</label>
//              <input
//                  className={styles.formInput}
//                  type="date"
//                  name="birthdate"
//                  onChange={formik.handleChange}
//                  value={formik.values.birthdate}
//              />
//              {formik.errors.birthdate && (
//                  <label className={styles.errorLabel}>{formik.errors.birthdate}</label>
//              )}
//          </div>
 
//          <div className={styles.formGroup}>
//              <label className={styles.formLabel}>nDni:</label>
//              <input
//                  className={styles.formInput}
//                  type="text"
//                  name="nDni"
//                  onChange={formik.handleChange}
//                  value={formik.values.nDni}
//              />
//              {formik.errors.nDni && (
//                  <label className={styles.errorLabel}>{formik.errors.nDni}</label>
//              )}
//          </div>
 
//          <div className={styles.formGroup}>
//              <label className={styles.formLabel}>Username:</label>
//              <input
//                  className={styles.formInput}
//                  type="text"
//                  name="username"
//                  placeholder="tu nombre de usuario"
//                  onChange={formik.handleChange}
//                  value={formik.values.username}
//              />
//              {formik.errors.username && (
//                  <label className={styles.errorLabel}>{formik.errors.username}</label>
//              )}
//          </div>
 
//          <div className={styles.formGroup}>
//              <label className={styles.formLabel}>Password:</label>
//              <input
//                  className={styles.formInput}
//                  type="password"
//                  name="passsword"
//                  placeholder="******"
//                  onChange={formik.handleChange}
//                  value={formik.values.passsword}
//              />
//              {formik.errors.passsword && (
//                  <label className={styles.errorLabel}>{formik.errors.passsword}</label>
//              )}
//          </div>
 
//          <button
//              className={styles.formButton}
//              type="submit"
//              disabled={
//                  formik.errors.name ||
//                  formik.errors.email ||
//                  formik.errors.birthdate ||
//                  formik.errors.nDni ||
//                  formik.errors.username ||
//                  formik.errors.passsword
//              }
//          >
//              Submit
//          </button>
//          <br />
//          <label>
//         Ya tienes una cuenta ? <Link to="/login">Login!</Link>
//       </label>
//        </form>
//      );
//  };
 
//  export default Register;
 


 















// import "../Register/Register.css";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; 

// const Register = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         birthdate: "",
//         nDni: "",
//         username: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const [error, setError] = useState("");
//     const navigate = useNavigate(); 

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         if (Object.values(form).some(value => typeof value === "string" && value.trim() === "")) {
//             return "Todos los campos son obligatorios.";
//         }
//         if (form.password.length < 8 || !/[A-Z]/.test(form.password)) {
//             return "La contraseña debe tener al menos 8 caracteres y una mayúscula.";
//         }
//         if (form.password !== form.confirmPassword) {
//             return "Las contraseñas no coinciden.";
//         }
//         return null;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationError = validateForm();
//         if (validationError) {
//             setError(validationError);
//             return;
//         }

//         const formattedBirthdate = new Date(form.birthdate);  
        
//         if (isNaN(formattedBirthdate.getTime())) {
//             setError("Fecha de nacimiento inválida.");
//             return;
//         }

//         const userData = { ...form, birthdate: formattedBirthdate, active: true };   
//         console.log("Datos enviados al backend:", userData);

//         try {
//             const response = await axios.post("http://localhost:3001/credentials/register", userData);
//             console.log("Usuario registrado:", response.data);
//             setError("");
//             navigate("/login"); 
//         } catch (err) {
//             console.error("Error en el registro:", err);
//             setError("Hubo un problema al registrar el usuario.");
//         }
//     };

//     return (
//         <div>
//             <h2>Registro</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="name" placeholder="Nombre completo" onChange={handleChange} value={form.name} />
//                 <input type="email" name="email" placeholder="Email" onChange={handleChange} value={form.email} />
//                 <input type="date" name="birthdate" onChange={handleChange} value={form.birthdate} />
//                 <input type="text" name="nDni" placeholder="DNI" onChange={handleChange} value={form.nDni} />
//                 <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} value={form.username} />
//                 <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={form.password} />
//                 <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleChange} value={form.confirmPassword} />
//                 <button type="submit">Registrarse</button>
//             </form>
//         </div>
//     );
// };

// export default Register;

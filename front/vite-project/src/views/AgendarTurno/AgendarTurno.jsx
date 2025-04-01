import Styles from './AgendarTurno.module.css'
import { Formik, useFormik } from "formik";
import { daeteTimeValidates } from "../../helpers/validates";
import { useContext } from 'react';
import { UsersContext } from '../../Context/UsersContext';
import Swal from 'sweetalert2';

const AgendarTurno = () => {
    const {createdAppointment, user} = useContext(UsersContext);


const formik = useFormik({
    initialValues: {
        date: "",
        time: ""
    },
initialErrors:{
    date: "La fecha es requerida",
    time: "La hora es requerida"


},

    validate: daeteTimeValidates,
    onSubmit: async (values) => {
        const valuesObject = {
            ...values,
            userId:  user
        }
        try{
          await createdAppointment(values)
          Swal.fire({
            icon: "succes",
            title: "Turno agendado con exito!"
          })
        } catch (error){
            Swal.fire({
                icon: "error",
                title: `${error.response.data.message}`,
                text: "Intentelo nuevamente"
            })
        } finally{
            formik.resetForm()
        }
       


    }
})

return (
<div className={Styles.container}>
    <h1 className={Styles.title}>Agendar Turno</h1>
    <form className={Styles.form} onSubmit={formik.handleSubmit}>
    <div className={Styles.formGroup}>
        <label htmlFor="date">Fecha</label>
        <input 
        id="date"
        name="date"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
        className={
            formik.touched.date && formik.errors.date
            ? Styles.errorInput
            : Styles.input 
        }
        />
        {formik.errors.date ? (
            <>
            <div className={Styles.error}>{formik.errors.date}</div>
            </>
        ) : null}
    </div>

    <div className={Styles.formGroup}>
        <label htmlFor="time">Hora</label>
        <input
         id="time"
         name="time"
         type="time"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.time}
         className={
             formik.touched.time && formik.errors.time
             ? Styles.errorInput
             : Styles.input 
         }
         />
         {formik.errors.time ? (
            <div className={Styles.error}>{formik.errors.time}</div>
         ) : null} 
    </div>

    <button
    type="submit"
    className={Styles.submitButon}
    disabled={Object.keys(formik.errors).length > 0}
>
    Agendar
</button>
    </form>
</div>
)
}

export default AgendarTurno;





export const registerFormValidates = (input) => {
    const errors = {}

    if(!input.name.trim()) errors.name = "Name is required"
     else if(!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(input.name))errors.name = "Name must be a valid name"
    



    if(!input.email.trim()) errors.email = "Email is required"
    else if(!/^\S+@\S+\.\S+$/.test(input.email)) errors.email = "Mail must be a valid email"
    


    if(!input.birthDate) errors.birthDate = "birthdate is required"

    if(!input.nDni) {
        errors.nDni = "nDni is required";
    }  else if (!/^\d+$/.test(input.nDni)){
        


        errors.nDni = "nDni must contain only numbers";
        
        } else if (input.nDni.length < 7 || input.nDni.length > 8) {
        
        errors.nDni = "nDni must be between 7 and 8 digits long";
        
        }

        if(!input.username.trim()){
            errors.username = "Username is required";
        } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
            errors.username = "Username must contain only letters and numbers";
        }

        if (!input.password.trim()) {

            errors.password = "Password is required";
            
            } else if (input.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
            
            } else if (!/[A-Z]/.test(input.password)) {
            errors.password = "Password must contain at least one uppercase letter";
            
            } else if (!/[0-9]/.test(input.password)) {
            
            errors.password = "Password must contain at least one number";
            
            } else if (!/[^A-Za-z0-9]/.test(input.password)) {
            
            errors.password = "Password must contain at least one special character";
            
            }
            return errors
            
    };

    const isValidTime = (time) => {
        const [hour, minutes] = time.split(":").map(Number)
        const totalMinutes = hour * 60 + minutes
        const startTime = 8 * 60
        const endTime = 18 * 60

        return totalMinutes >= startTime && totalMinutes < endTime
    }
export const daeteTimeValidates = (input) => {

    const errors = {}
    const { date, time } = input

    const selectedDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    if(!date) errors.date = "la fecha es obligatoria"
    else if(selectedDateTime < now) errors.date = "No puedes agendar citas para fechas pasadas"
    else if(selectedDateTime < twentyFourHoursLater) errors.date = "Debes angendar una fecha por lo menos con 24 hs de antelacion"
    else if(selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6) errors.date = "No se pueden agendar turnos los fines de semana"


    if (!time) errors.time = "la hora es obligatoria"
    else if(!isValidTime(time)) errors.time = "La hora debe ser entre las 8am y las 6 pm"

    return errors
}

// export const loginFormValidates = (input) => {
//     const errors = {};

//     if (!input.email.trim()) {
//         errors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
//         errors.email = "Email must be a valid email";
//     }

//     if (!input.password.trim()) {
//         errors.password = "Password is required";
//     } else if (input.password.length < 8) {
//         errors.password = "Password must be at least 8 characters long";
//     } else if (!/[0-9]/.test(input.password)) {
//         errors.password = "Password must contain at least one number";
//     } else if (!/[^A-Za-z0-9]/.test(input.password)) {
//         errors.password = "Password must contain at least one special character";
//     }

//     return errors;
// };
export const loginFormValidates = (input) => {
    const errors = {};

    // Verificar que input.email y input.password no sean undefined o null
    if (input.email && !input.email.trim()) {
        errors.email = "Email is required";
    } else if (input.email && !/^\S+@\S+\.\S+$/.test(input.email)) {
        errors.email = "Email must be a valid email";
    }

    if (input.password && !input.password.trim()) {
        errors.password = "Password is required";
    } else if (input.password && input.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (input.password && !/[0-9]/.test(input.password)) {
        errors.password = "Password must contain at least one number";
    } else if (input.password && !/[^A-Za-z0-9]/.test(input.password)) {
        errors.password = "Password must contain at least one special character";
    }

    return errors;
};

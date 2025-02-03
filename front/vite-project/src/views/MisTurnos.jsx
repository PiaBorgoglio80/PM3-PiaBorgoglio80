import { useState } from "react";
import misTurnos from "../helpers/misTurnos";
import Turno from "../components/Turno/Turno";

const MisTurnos = () => {
    const [turnos, setTurnos] = useState(misTurnos);

    return (
        <>
            <h1>Mis Turnos</h1>
            <h3>Estos son los turnos del usuario:</h3>
            <div>
                {turnos.map(turno => (
                    <Turno 
                        key={turno.id} 
                        id={turno.id} 
                        date={turno.date} 
                        time={turno.time} 
                        description={turno.description} 
                    />
                ))}
            </div>
        </>
    );
};

export default MisTurnos;
























//
// 
//  const Misturnos = () => {
//     return(
//         <>
//         <h1>Esta en la vista de mis turnos</h1>
//         </>
//     );
// };

// export default Misturnos; 
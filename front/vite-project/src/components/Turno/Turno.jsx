import "./Turno.css";


const Turno = ({ id, date, time, description }) => {
    return (
        <div className="turno-card">
            <h4>Turno #{id}</h4>
            <p>Fecha: {date}</p>
            <p>Hora: {time}</p>
            <p>Descripción: {description}</p>
        </div>
    );
};

export default Turno;
import { Link } from "react-router-dom";
import Styles from './Home.module.css'


const Home = () => {
    return (
        <div className={Styles.homeContainer}>
            <h1 className={Styles.welcomeTitle}>Bienvenid@!!!</h1>
            <p className={Styles.welcomeMessage}>
                ¿Quieres
                <Link to="/agendarturno" className={Styles.link}>
                agendar
                </Link>
                un nuevo turno?
            </p>
        </div>
    )
}

export default Home;






// import { useState } from "react";
// import texts from "../helpers/texts";
// import ImgText from "../ImgText/ImgText"; 
// import "../views/Home/Home.css";

// const Home = () => {
//     const [textsToShow] = useState(texts);

//     return (
//         <div className="home-container">
//             <h1>Bienvenido a VIBRAS - Centro de SPA</h1>
//             <div className="content">
//                 {textsToShow.map((item, index) => (
//                     <ImgText key={index} text={item.text} img={item.img} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;






















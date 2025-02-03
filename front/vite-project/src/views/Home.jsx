import { useState } from "react";
import texts from "../helpers/texts";
import ImgText from "../ImgText/ImgText"; // Revisa la ruta

const Home = () => {
    const [textsToShow, setTextsToShow] = useState(texts);

    return (
        <>
            <h1>Bienvenido al Gestor de Turnos</h1>
            <div>
                {textsToShow.map((item, index) => (
                    <ImgText key={index} text={item.text} img={item.img} />
                ))}
            </div>
        </>
    );
};

export default Home;






















// import { useState } from "react";
// import texts from "../helpers/texts";
// import ImgText from "../ImgText/ImgText";
// import Navbar from "../components/Navbar";

// const Home = () => {
//     const [textsToShow, setTextsToShow] = useState(texts);

//     return (
//         <>
//             <Navbar />
//             <h1>Bienvenido al Gestor de Turnos</h1>
//             <div>
//                 {textsToShow.map((text, index) => (
//                     <ImgText key={index} text={text} img={item.img} />
//                 ))}
//             </div>
//         </>
//     );
// };

// export default Home;


















// import Navbar from "../components/Navbar"

// const Home = () => {
//     return (
//         <>
//         <Navbar></Navbar>
//         <h1>Este es el componente Home</h1>
      
//     </>
//     );
// } ;

// export default Home;
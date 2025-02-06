import express from "express";
import cors from "cors";
import router from "./routes/indexRouter"; 

const server = express();


server.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));

server.use(express.json());


  
  

server.use(router); 

server.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
  });

export default server;




















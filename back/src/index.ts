import express from "express";
import cors from "cors";  
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/usersRoutes";  
import 'reflect-metadata';
import credentialsRouter from "./routes/credentialsRoutes"; 
import appointmentsRouter from "./routes/appointmentsRoutes"; 

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions)); 

app.use(express.json()); 

app.use("/credentials", credentialsRouter);  
app.use("/appointments", appointmentsRouter); 

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos realizada con éxito");
    app.listen(3001, () => { 
      console.log("Servidor escuchando en el puerto 3001");
    });
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
  });









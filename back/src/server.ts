import express from "express";
import router from "./routes/indexRouter"; 
import credentialsRoutes from "./routes/credentialsRoutes"; 

const server = express();

server.use(express.json());

server.use("/credentials", credentialsRoutes); 
server.use(router); 

export default server;

















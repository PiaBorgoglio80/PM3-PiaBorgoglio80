import express from "express";
import cors from "cors";
import morgan from "morgan"
// import router from "./routes/indexRouter";
import router from "./routes/indexRouter";
import 'reflect-metadata' 
;
const server = express();


server.use(cors())

server.use(express.json());

server.use(morgan("dev"))
  
  

server.use(router); 



export default server;






// import express from "express";
// import cors from "cors";
// import morgan from "morgan"
// // import router from "./routes/indexRouter";
// import router from "./routes/indexRouter";
// import 'reflect-metadata' 
// ;
// const server = express();


// server.use(cors())

// server.use(express.json());

// server.use(morgan("dev"))
  
  

// server.use(router); 



// export default server;




















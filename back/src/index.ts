import 'reflect-metadata';
import server from "./server";

const initializeApp = async () => {
  try {
    const { PORT } = await import('./config/envs');  
    const { AppDataSource } = await import('./config/data-source');  
    await AppDataSource.initialize();
    console.log("Database connection successful");

    server.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Error initializing application:", err);
  }
};

initializeApp();







// import 'reflect-metadata';
// import { PORT } from "./config/envs";
// import server from "./server";

// const initializeApp = async () => {
//   try {
//     const { AppDataSource } = await import('./config/data-source.js');
//     await AppDataSource.initialize();
    
//     console.log("Database connection successful");
    
//     server.listen(PORT, () => {
//       console.log(`Server listening on port: ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Error initializing database:", err);
//   }
// };

// initializeApp();






// import { AppDataSource } from "./config/data-source";
// import { PORT } from "./config/envs";
//   import server from "./server";
//   import 'reflect-metadata';



  
//   AppDataSource .initialize()
//   .then(() =>{
  
//     console.log("Database connection successfull")

//  server.listen(PORT, () => {
//    console.log(`Server listen on port: ${PORT} `) 
//   })

//   })
//   .catch((err) => {
//     console.log(err); 
//   })


 
  



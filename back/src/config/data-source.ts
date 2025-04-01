import { DataSource, Repository } from "typeorm"; 
import { Credential } from '../entities/Credentiials.Entity';  
import { Appointment } from '../entities/Appoiintment.Entity';  
import { User } from "../entities/Useer.Entity";   

export const AppDataSource = new DataSource({   
  type: "postgres",   
  host: process.env.DB_HOST || "localhost",   
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,   
  username: process.env.DB_USERNAME || "postgres",   
  password: process.env.DB_PASSWORD || "Damuelon13",   
  database: process.env.DB_DATABASE || "typeorm",   
  synchronize: process.env.DB_SYNC === "true",   
  logging: process.env.DB_LOGGIN === "true",   
  entities: [User, Credential, Appointment],   
  migrations: ["src/migrations/*.ts"],   
  dropSchema: process.env.DB_DROP === "true", 
});  

export let userModel: Repository<User>; 
export let credentialModel: Repository<Credential>; 
export let appointmentModel: Repository<Appointment>;  

export const initializeDataSource = async () => {   
  if (!AppDataSource.isInitialized) {     
    await AppDataSource.initialize();          
    userModel = AppDataSource.getRepository(User);     
    credentialModel = AppDataSource.getRepository(Credential);     
    appointmentModel = AppDataSource.getRepository(Appointment);
    
    console.log("Data Source has been initialized!");   
  } 
};






// import { DataSource, Repository } from "typeorm";
// import { Credential } from '../entities/Credentiials.Entity'; 
// import { Appointment } from '../entities/Appoiintment.Entity'; 
// import { User } from "../entities/Useer.Entity"; 

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
//   username: process.env.DB_USERNAME || "postgres",
//   password: process.env.DB_PASSWORD || "Damuelon13",
//   database: process.env.DB_DATABASE || "typeorm",
//   synchronize: process.env.DB_SYNC === "true",
//   logging: process.env.DB_LOGGIN === "true",
//   entities: [User, Credential, Appointment],
//   migrations: ["src/migrations/*.ts"],
//   dropSchema: process.env.DB_DROP === "true",
// });

// export let userModel: Repository<User>;
// export let credentialModel: Repository<Credential>;
// export let appointmentModel: Repository<Appointment>;

// export const initializeDataSource = async () => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
    
//     userModel = AppDataSource.getRepository(User);
//     credentialModel = AppDataSource.getRepository(Credential);
//     appointmentModel = AppDataSource.getRepository(Appointment); // Descomentado
    
//     console.log("Data Source has been initialized!");
//   }
// };



// // src/config/data-source.ts
// import { DataSource, Repository } from "typeorm";
// import { Credential } from '../entities/Credentiials.Entity'; //
// import { Appointment } from '../entities/Appoiintment.Entity'; //
// import { User } from "../entities/Useer.Entity"; //

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
//   username: process.env.DB_USERNAME || "postgres",
//   password: process.env.DB_PASSWORD || "Damuelon13",
//   database: process.env.DB_DATABASE || "typeorm",
//   synchronize: process.env.DB_SYNC === "true",
//   logging: process.env.DB_LOGGIN === "true",
//   entities: [User, Credential, Appointment],
//   migrations: ["src/migrations/*.ts"],
//   dropSchema: process.env.DB_DROP === "true",
// });

// export let userModel: Repository<User>;
// export let credentialModel: Repository<Credential>;
// export let appointmentModel: Repository<Appointment>;

// export const initializeDataSource = async () => {
//   if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
    
//     userModel = AppDataSource.getRepository(User);
//     credentialModel = AppDataSource.getRepository(Credential);
//     // appointmentModel = AppDataSource.getRepository(Appointment);
    
//     console.log("Data Source has been initialized!");
//   }
// };



// import { DataSource } from "typeorm";
// import { User } from '../entities/User.entity';
// import { Credential } from '../entities/Credentials.Entity';
// import { Appointment } from '../entities/Appointments';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
//   username: process.env.DB_USERNAME || "postgres",
//   password: process.env.DB_PASSWORD || "password",
//   database: process.env.DB_DATABASE || "mydb",
//   synchronize: process.env.DB_SYNC === "true",
//   logging: process.env.DB_LOGGIN === "true",
//   entities: [User, Credential, Appointment],
//   migrations: ["src/migrations/*.ts"],
//   dropSchema: process.env.DB_DROP === "true",
// });

// export default AppDataSource;





// import { DataSource, Repository } from "typeorm";
// import { DB_DATABASE, DB_DROP, DB_ENTITIES, DB_HOST, DB_LOGGIN, DB_PASSWORD, DB_PORT, DB_SYNC, DB_TYPE, DB_USERNAME } from "./envs";
// import{User} from '../entities/User.entity'
// import {Credential} from '../entities/Credentials.Entity'

// export const AppDataSource = new DataSource({
//   type: DB_TYPE,
//   host: DB_HOST,
//   port: DB_PORT,
//   username: DB_USERNAME,
//   password: DB_PASSWORD,
//   database: DB_DATABASE,
//   synchronize: DB_SYNC,  
//   logging: DB_LOGGIN,
//   entities: DB_ENTITIES,
//   dropSchema: DB_DROP,
 
// });

//  export const userModel: Repository<User> = AppDataSource.getRepository(User);
//  export const credentialModel:Repository<Credential> = AppDataSource.getRepository(Credential);
// // export const appointmentRepository = AppDataSource.getRepository(Appointment);

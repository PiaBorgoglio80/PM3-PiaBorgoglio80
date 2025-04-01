import "dotenv/config";
import { DriverPackageNotInstalledError } from "typeorm";
import { User } from "../entities/Useer.Entity"; //
import { Credential } from "../entities/Credentiials.Entity";//
import { Appointment } from "../entities/Appoiintment.Entity"; //

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
export const DB_TYPE =  "postgres";

export const DB_HOST: string | undefined = process.env.DB_HOST 

export const DB_PORT: number | undefined = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

export const DB_USERNAME: string | undefined = process.env.DB_USERNAME

export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD


export const DB_DATABASE: string | undefined = process.env.DB_DATABASE

export const DB_SYNC: boolean = process.env.DB_SYNC ? process.env.DB_SYNC === "true" : false

// export const DB_LOGGIN: boolean = process.env.DB_LOGGIN ?  process.env.DB_LOGGIN === "true": true

export const DB_LOGGIN: boolean = process.env.DB_LOGGIN === "true"; // Esto asegura que se convierta a un booleano


// export const DB_ENTITIES:string[] = process.env.DB_ENTITIES ? process.env.DB_ENTITIES.split(",") : ["src/entities/**/*.ts"]
export const DB_ENTITIES = [User, Credential, Appointment];

export const DB_DROP: boolean = process.env.DB_DROP ? process.env.DB_DROP === "true": true





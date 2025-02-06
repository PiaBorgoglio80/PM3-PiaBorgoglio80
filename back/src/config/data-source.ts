import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credentials } from "../entities/Credentials";
import { Appointment } from "../entities/Appointments";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Qazw2344",
  database: "typeorm",
  synchronize: true,  
  logging: true,
  entities: [User, Credentials, Appointment],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});



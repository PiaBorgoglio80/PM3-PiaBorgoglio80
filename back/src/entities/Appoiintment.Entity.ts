import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { Credential } from "./Credentiials.Entity.js";
import { Tracing } from "trace_events";
import { User } from "./Useer.Entity"; //
import { Status } from "../interfaces/IAppointments" //

@Entity("appointment")
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "date", nullable: false})
    date: Date

    @Column({type: "varchar", length: 5, nullable: false})
    time: string

    @Column({type: "varchar", length: 10, nullable: false, default: Status.Active})
    status: Status

    @ManyToOne(() => User, user => user.appointments, {nullable: false} )
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
    
    
}


  
      
    

// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./User.entity";

// // Definir el Enum dentro de este archivo o importarlo correctamente
// export enum Status {
//     Active = "active",
//     Cancelled = "cancelled",
// }

// @Entity({ name: "appointments" })
// export class Appointment {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ type: "date" })
//     date: string;

//     @Column({ type: "time" })
//     time: string;

//     @Column({ type: "enum", enum: Status, default: Status.Active }) 
//     status: Status;

//     @Column({ type: "text" }) 
//     description: string;


//     @ManyToOne(() => User, (user: User) => user.appointments)
//     user: User;
// }




// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Status } from "../interfaces/IAppointments";
// import {User} from "./User.entity";

// @Entity({name: "appointments"})
// export class Appointment{
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({type: "date"})
//     date: string;

//     @Column({type: "time"})
//     time: string;

//     @Column({default: Status.Active})
//     status: Status;

//     @Column()
//     description: string;


//     @ManyToOne(() => User, (user: User) => user.appointments)
//     user: User;
// } 
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"; 
import { Credential } from "./Credentiials.Entity";
import { Appointment } from "./Appoiintment.Entity"; 

@Entity({name: "users"}) 
export class User {   
  @PrimaryGeneratedColumn()   
  id: number;    
  
  @Column({type: 'varchar', length: 50, nullable: false }) 
  name: string;  
  
  @Column({type:'varchar', length: 100, unique: true, nullable: false}) 
  email: string;   
  
  @Column({type: 'date', nullable: false}) 
  birthDate: Date;  
  
  @Column({type: "integer", nullable: false, unique: true}) 
  nDni: number;  
  
  @CreateDateColumn() 
  createdAt?: Date;  
  
  @UpdateDateColumn() 
  updatedAt?: Date;  
  
  @OneToOne(() => Credential, credential => credential.user, {cascade: true}) 
  @JoinColumn() 
  credential: Credential;  
  
  @OneToMany(() => Appointment, appointment => appointment.user) 
  appointments: Appointment[];  
}








// import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import {Credential} from "./Credentiials.Entity"; //
// // import { Appointment } from "./Appointment.Entity";
// import { Appointment } from "./Appoiintment.Entity"; //

// @Entity({name: "users"})
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;
  
// @Column({type: 'varchar', length: 50, nullable: false })
// name: string;

// @Column({type:'varchar',length: 100, unique: true, nullable: false})
// email: string;


// @Column({type: 'date', nullable: false})
// birthDate: Date;

// @Column({type: "integer", nullable: false, unique: true})
// nDni: number;

// @CreateDateColumn()
// createdAt?: Date

// @UpdateDateColumn()
// updatedAt?: Date

// @OneToOne(() => Credential, {cascade: true})
// @JoinColumn()
// credential: Credential;

// @OneToMany(() => Appointment, appointment => appointment.user)
// appointments: Appointment[];

// };


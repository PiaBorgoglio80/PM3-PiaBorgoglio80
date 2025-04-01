import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./Useer.Entity";

@Entity({name: "credentials"}) 
export class Credential {   
  @PrimaryGeneratedColumn()   
  id: number;    
  
  @Column({type: "varchar", unique: true, nullable: false})   
  username: string;    
  
  @Column({type: "varchar", select: false})   
  password: string;    
  
  @CreateDateColumn()   
  createdAt?: Date;      
  
  @UpdateDateColumn()   
  updatedAt?: Date;    
  
  @OneToOne(() => User, user => user.credential)   
  user: User;
}








// import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// // import { User } from "./User.Entity";
// import { User } from "./Useer.Entity"; //


// @Entity({name: "credentials"})
// export class Credential {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({type: "varchar", unique: true, nullable: false})
//   username: string;

//   @Column({type: "varchar", select: false})
//   password: string;

//   @CreateDateColumn()
//   createdAt?: Date
  
//   @UpdateDateColumn()
//   updatedAt?: Date

//   @OneToOne(() => User)
//   user: User
// }












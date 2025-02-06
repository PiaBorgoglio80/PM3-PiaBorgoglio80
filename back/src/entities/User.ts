import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Credentials } from "./Credentials";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  nDni: string;

  @Column()
  active: boolean;

@OneToOne(() => Credentials, { nullable: false, cascade: true }) 
@JoinColumn({ name: "credentialsId" }) 
credentials: Credentials;

}


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({ name: "appointments" })
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User)
    user: User;

    @Column()
    date: Date;

    @Column({ type: "enum", enum: ["scheduled", "cancelled"], default: "scheduled" })
    status: "scheduled" | "cancelled";
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: "users"
})

export class User{
        @PrimaryGeneratedColumn()
        id: number

        @Column({
            length: 100
        })
        name: string 

        @Column()
        email: string

        @Column()
        birthdate: Date

        @Column()
        nDni: string

        @Column()
        credentialsId: number

        @Column() 
        active: boolean
}
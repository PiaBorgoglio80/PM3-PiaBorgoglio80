import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndAppointments1738777900318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR(255) UNIQUE NOT NULL,
                "password" VARCHAR(255) NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "appointments" (
                "id" SERIAL PRIMARY KEY,
                "date" TIMESTAMP NOT NULL,
                "status" VARCHAR(50) NOT NULL,
                "userId" INT,
                CONSTRAINT "FK_user_appointments" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "appointments";
        `);

        await queryRunner.query(`
            DROP TABLE "users";
        `);
    }
}
















// import { MigrationInterface, QueryRunner } from "typeorm";

// export class 1738777900318CreateUsersAndAppointments.ts1738855402424 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//             CREATE TABLE "user" (
//                 "id" SERIAL PRIMARY KEY,
//                 "email" VARCHAR(255) UNIQUE NOT NULL,
//                 "password" VARCHAR(255) NOT NULL
//             );
//         `
    
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }

// }

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAppointments1743446588252 implements MigrationInterface {
    name = 'InitAppointments1743446588252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credetials" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_74403256fb31cde9fde537ceb73" UNIQUE ("username"), CONSTRAINT "PK_7d93db78056f5a67d37e80f586e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('active', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" SERIAL NOT NULL, "date" date NOT NULL, "time" TIME NOT NULL, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'active', "description" text NOT NULL, "userId" integer, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "birthDate" date NOT NULL, "nDni" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "credentialId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_e7f1e0d33d9012a8bf2f008fe75" UNIQUE ("nDni"), CONSTRAINT "REL_d6d50143a16c49c49bf467ae54" UNIQUE ("credentialId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6d50143a16c49c49bf467ae541" FOREIGN KEY ("credentialId") REFERENCES "credetials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6d50143a16c49c49bf467ae541"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
        await queryRunner.query(`DROP TABLE "credetials"`);
    }

}

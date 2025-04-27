import {MigrationInterface, QueryRunner} from "typeorm";

export class addBudgetItem1745504989052 implements MigrationInterface {
    name = 'addBudgetItem1745504989052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "budget" integer`);
        await queryRunner.query(`CREATE TYPE "public"."itineraries_status_enum" AS ENUM('draft', 'published')`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "status" "public"."itineraries_status_enum" NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "publicationDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "duration" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "destination" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "startDate" date`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "endDate" date`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "rating" numeric(3,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "destination" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "duration" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "publicationDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."itineraries_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "budget"`);
    }

}

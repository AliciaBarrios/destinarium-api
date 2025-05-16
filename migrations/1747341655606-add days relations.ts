import {MigrationInterface, QueryRunner} from "typeorm";

export class addDaysRelations1747341655606 implements MigrationInterface {
    name = 'addDaysRelations1747341655606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."days" DROP CONSTRAINT "FK_32ae4d44bde8eb14c09028fab77"`);
        await queryRunner.query(`ALTER TABLE "public"."days" RENAME COLUMN "itineraryItineraryId" TO "itineraryId"`);
        await queryRunner.query(`ALTER TABLE "public"."categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."itineraries_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."days" ALTER COLUMN "itineraryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."days" ADD CONSTRAINT "FK_0bd5c5c0693da0e13b1666e9166" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."days" DROP CONSTRAINT "FK_0bd5c5c0693da0e13b1666e9166"`);
        await queryRunner.query(`ALTER TABLE "public"."days" ALTER COLUMN "itineraryId" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."itineraries_status_enum" AS ENUM('draft', 'published')`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "status" "public"."itineraries_status_enum" NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE "public"."categories" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."days" RENAME COLUMN "itineraryId" TO "itineraryItineraryId"`);
        await queryRunner.query(`ALTER TABLE "public"."days" ADD CONSTRAINT "FK_32ae4d44bde8eb14c09028fab77" FOREIGN KEY ("itineraryItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

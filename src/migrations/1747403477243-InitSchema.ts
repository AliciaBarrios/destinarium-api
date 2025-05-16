import {MigrationInterface, QueryRunner} from "typeorm";

export class InitSchema1747403477243 implements MigrationInterface {
    name = 'InitSchema1747403477243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."days" ADD "dayNumber" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."days" DROP COLUMN "dayNumber"`);
    }

}

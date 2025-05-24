import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyAccommodationEntity1747683960786 implements MigrationInterface {
    name = 'modifyAccommodationEntity1747683960786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accommodations" ("accommodationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "address" character varying NOT NULL, "type" "accommodations_type_enum" NOT NULL, "price" numeric NOT NULL, "web" character varying, CONSTRAINT "PK_0608149a621b6f68225da99810c" PRIMARY KEY ("accommodationId"))`);
        await queryRunner.query(`CREATE TABLE "itineraries_accommodations_accommodations" ("itinerariesItineraryId" uuid NOT NULL, "accommodationsAccommodationId" uuid NOT NULL, CONSTRAINT "PK_eaad78eb432edeed0790feea37f" PRIMARY KEY ("itinerariesItineraryId", "accommodationsAccommodationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80cb207b8e21dd2c2001d83233" ON "itineraries_accommodations_accommodations" ("itinerariesItineraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f198a0ddf0468ad21928c93d8" ON "itineraries_accommodations_accommodations" ("accommodationsAccommodationId") `);
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" ADD CONSTRAINT "FK_80cb207b8e21dd2c2001d832330" FOREIGN KEY ("itinerariesItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" ADD CONSTRAINT "FK_1f198a0ddf0468ad21928c93d89" FOREIGN KEY ("accommodationsAccommodationId") REFERENCES "accommodations"("accommodationId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" DROP CONSTRAINT "FK_1f198a0ddf0468ad21928c93d89"`);
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" DROP CONSTRAINT "FK_80cb207b8e21dd2c2001d832330"`);
        await queryRunner.query(`DROP INDEX "IDX_1f198a0ddf0468ad21928c93d8"`);
        await queryRunner.query(`DROP INDEX "IDX_80cb207b8e21dd2c2001d83233"`);
        await queryRunner.query(`DROP TABLE "itineraries_accommodations_accommodations"`);
        await queryRunner.query(`DROP TABLE "accommodations"`);
    }

}

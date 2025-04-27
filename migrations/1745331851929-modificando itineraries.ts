import {MigrationInterface, QueryRunner} from "typeorm";

export class modificandoItineraries1745331851929 implements MigrationInterface {
    name = 'modificandoItineraries1745331851929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."itineraries_categories_categories" DROP CONSTRAINT "FK_03bca9cccea0d1a1624b36126b3"`);
        await queryRunner.query(`CREATE TABLE "itineraries_transports_transports" ("itinerariesItineraryId" uuid NOT NULL, "transportsTransportId" uuid NOT NULL, CONSTRAINT "PK_98288bae94762ff119634159de3" PRIMARY KEY ("itinerariesItineraryId", "transportsTransportId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4405cd81597cfc434f0c27756c" ON "itineraries_transports_transports" ("itinerariesItineraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a5d76e5886b270f7007941c895" ON "itineraries_transports_transports" ("transportsTransportId") `);
        await queryRunner.query(`CREATE TABLE "itineraries_restaurants_restaurants" ("itinerariesItineraryId" uuid NOT NULL, "restaurantsRestaurantId" uuid NOT NULL, CONSTRAINT "PK_eb8815d91798df37c3a805ba206" PRIMARY KEY ("itinerariesItineraryId", "restaurantsRestaurantId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9da2097a7c6f3048986a0899b9" ON "itineraries_restaurants_restaurants" ("itinerariesItineraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b79ad03be4f92336fa7f0b4581" ON "itineraries_restaurants_restaurants" ("restaurantsRestaurantId") `);
        await queryRunner.query(`CREATE TABLE "itineraries_accommodations_accommodations" ("itinerariesItineraryId" uuid NOT NULL, "accommodationsAccommodationId" uuid NOT NULL, CONSTRAINT "PK_eaad78eb432edeed0790feea37f" PRIMARY KEY ("itinerariesItineraryId", "accommodationsAccommodationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80cb207b8e21dd2c2001d83233" ON "itineraries_accommodations_accommodations" ("itinerariesItineraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f198a0ddf0468ad21928c93d8" ON "itineraries_accommodations_accommodations" ("accommodationsAccommodationId") `);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "userAlias"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "coverImage" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."restaurants" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "public"."restaurants" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries_categories_categories" ADD CONSTRAINT "FK_03bca9cccea0d1a1624b36126b3" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" ADD CONSTRAINT "FK_4405cd81597cfc434f0c27756c4" FOREIGN KEY ("itinerariesItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" ADD CONSTRAINT "FK_a5d76e5886b270f7007941c895d" FOREIGN KEY ("transportsTransportId") REFERENCES "transports"("transportId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" ADD CONSTRAINT "FK_9da2097a7c6f3048986a0899b95" FOREIGN KEY ("itinerariesItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" ADD CONSTRAINT "FK_b79ad03be4f92336fa7f0b45818" FOREIGN KEY ("restaurantsRestaurantId") REFERENCES "restaurants"("restaurantId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" ADD CONSTRAINT "FK_80cb207b8e21dd2c2001d832330" FOREIGN KEY ("itinerariesItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" ADD CONSTRAINT "FK_1f198a0ddf0468ad21928c93d89" FOREIGN KEY ("accommodationsAccommodationId") REFERENCES "accommodations"("accommodationId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" DROP CONSTRAINT "FK_1f198a0ddf0468ad21928c93d89"`);
        await queryRunner.query(`ALTER TABLE "itineraries_accommodations_accommodations" DROP CONSTRAINT "FK_80cb207b8e21dd2c2001d832330"`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" DROP CONSTRAINT "FK_b79ad03be4f92336fa7f0b45818"`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" DROP CONSTRAINT "FK_9da2097a7c6f3048986a0899b95"`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" DROP CONSTRAINT "FK_a5d76e5886b270f7007941c895d"`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" DROP CONSTRAINT "FK_4405cd81597cfc434f0c27756c4"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries_categories_categories" DROP CONSTRAINT "FK_03bca9cccea0d1a1624b36126b3"`);
        await queryRunner.query(`ALTER TABLE "public"."restaurants" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "public"."restaurants" ADD "rating" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" DROP COLUMN "coverImage"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries" ADD "userAlias" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_1f198a0ddf0468ad21928c93d8"`);
        await queryRunner.query(`DROP INDEX "IDX_80cb207b8e21dd2c2001d83233"`);
        await queryRunner.query(`DROP TABLE "itineraries_accommodations_accommodations"`);
        await queryRunner.query(`DROP INDEX "IDX_b79ad03be4f92336fa7f0b4581"`);
        await queryRunner.query(`DROP INDEX "IDX_9da2097a7c6f3048986a0899b9"`);
        await queryRunner.query(`DROP TABLE "itineraries_restaurants_restaurants"`);
        await queryRunner.query(`DROP INDEX "IDX_a5d76e5886b270f7007941c895"`);
        await queryRunner.query(`DROP INDEX "IDX_4405cd81597cfc434f0c27756c"`);
        await queryRunner.query(`DROP TABLE "itineraries_transports_transports"`);
        await queryRunner.query(`ALTER TABLE "public"."itineraries_categories_categories" ADD CONSTRAINT "FK_03bca9cccea0d1a1624b36126b3" FOREIGN KEY ("categoriesCategoryId") REFERENCES "categories"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

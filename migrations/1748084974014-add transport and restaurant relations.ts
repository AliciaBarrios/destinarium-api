import {MigrationInterface, QueryRunner} from "typeorm";

export class addTransportAndRestaurantRelations1748084974014 implements MigrationInterface {
    name = 'addTransportAndRestaurantRelations1748084974014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transports" ("transportId" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "transports_type_enum" NOT NULL, "company" character varying, "address" character varying NOT NULL, "web" character varying, "serviceType" character varying NOT NULL DEFAULT 'transporte', CONSTRAINT "PK_4cb128b88822b44048c8896e3d4" PRIMARY KEY ("transportId"))`);
        await queryRunner.query(`CREATE TABLE "restaurants" ("restaurantId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "price" integer NOT NULL, "address" character varying NOT NULL, "web" character varying, "serviceType" character varying NOT NULL DEFAULT 'restaurante', CONSTRAINT "PK_705b3b16123dbc65824c92f4265" PRIMARY KEY ("restaurantId"))`);
        await queryRunner.query(`CREATE TABLE "itineraries_transports_transports" ("itinerariesItineraryId" uuid NOT NULL, "transportsTransportId" uuid NOT NULL, CONSTRAINT "PK_98288bae94762ff119634159de3" PRIMARY KEY ("itinerariesItineraryId", "transportsTransportId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4405cd81597cfc434f0c27756c" ON "itineraries_transports_transports" ("itinerariesItineraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a5d76e5886b270f7007941c895" ON "itineraries_transports_transports" ("transportsTransportId") `);
        await queryRunner.query(`CREATE TABLE "itineraries_restaurants_restaurants" ("itinerariesItineraryId" uuid NOT NULL, "restaurantsRestaurantId" uuid NOT NULL, CONSTRAINT "PK_eb8815d91798df37c3a805ba206" PRIMARY KEY ("itinerariesItineraryId", "restaurantsRestaurantId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9da2097a7c6f3048986a0899b9" ON "itineraries_restaurants_restaurants" ("itinerariesItineraryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b79ad03be4f92336fa7f0b4581" ON "itineraries_restaurants_restaurants" ("restaurantsRestaurantId") `);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" ADD CONSTRAINT "FK_4405cd81597cfc434f0c27756c4" FOREIGN KEY ("itinerariesItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" ADD CONSTRAINT "FK_a5d76e5886b270f7007941c895d" FOREIGN KEY ("transportsTransportId") REFERENCES "transports"("transportId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" ADD CONSTRAINT "FK_9da2097a7c6f3048986a0899b95" FOREIGN KEY ("itinerariesItineraryId") REFERENCES "itineraries"("itineraryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" ADD CONSTRAINT "FK_b79ad03be4f92336fa7f0b45818" FOREIGN KEY ("restaurantsRestaurantId") REFERENCES "restaurants"("restaurantId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" DROP CONSTRAINT "FK_b79ad03be4f92336fa7f0b45818"`);
        await queryRunner.query(`ALTER TABLE "itineraries_restaurants_restaurants" DROP CONSTRAINT "FK_9da2097a7c6f3048986a0899b95"`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" DROP CONSTRAINT "FK_a5d76e5886b270f7007941c895d"`);
        await queryRunner.query(`ALTER TABLE "itineraries_transports_transports" DROP CONSTRAINT "FK_4405cd81597cfc434f0c27756c4"`);
        await queryRunner.query(`DROP INDEX "IDX_b79ad03be4f92336fa7f0b4581"`);
        await queryRunner.query(`DROP INDEX "IDX_9da2097a7c6f3048986a0899b9"`);
        await queryRunner.query(`DROP TABLE "itineraries_restaurants_restaurants"`);
        await queryRunner.query(`DROP INDEX "IDX_a5d76e5886b270f7007941c895"`);
        await queryRunner.query(`DROP INDEX "IDX_4405cd81597cfc434f0c27756c"`);
        await queryRunner.query(`DROP TABLE "itineraries_transports_transports"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
        await queryRunner.query(`DROP TABLE "transports"`);
    }

}

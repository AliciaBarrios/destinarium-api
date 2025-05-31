import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { UsersModule } from './users/users.module';
import { DayModule } from './days/day.module';
import { AccommodationModule } from './accommodations/accommodation.module';
import { RestaurantModule } from './restaurants/restaurant.module';
import { TransportModule } from './transports/transport.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PlacesService } from './places/places.service';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logging: true,
        migrations: ['dist/migrations/**/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    UsersModule,
    CategoriesModule,
    ItinerariesModule,
    AuthModule,
    DayModule,
    AccommodationModule,
    RestaurantModule,
    TransportModule,
    PlacesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PlacesService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { UsersModule } from './users/users.module';
import { DayModule } from './days/day.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    CategoriesModule,
    ItinerariesModule,
    AuthModule,
    DayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

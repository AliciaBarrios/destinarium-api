import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportEntity } from './transport.entity';
import { TransportMapper } from './transport.mapper';
import { TransportRepository } from './transport.repository';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransportEntity])],
  controllers: [TransportController],
  providers: [TransportMapper, TransportRepository, TransportService],
  exports: [TransportService, TypeOrmModule],
})
export class TransportModule {}

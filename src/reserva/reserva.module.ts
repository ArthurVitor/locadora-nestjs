import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/Reserva.entity';
import { ReservaRepository } from './repositories/reserva.repository';
import { ReservaProfile } from './profile/ReservaProfile';
import { CarModule } from '../car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), CarModule],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaRepository, ReservaProfile],
})
export class ReservaModule {}

import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/Reserva.entity';
import { ReservaRepository } from './repositories/reserva.repository';
import { ReservaProfile } from './profile/ReservaProfile';
import { CarModule } from '../car/car.module';
import { Seguro } from './entities/Seguro.entity';
import { SeguroService } from './seguro.service';
import { SeguroRepository } from './repositories/seguro.repository';
import { SeguroProfile } from './profile/SeguroProfile';
import { SeguroController } from './seguro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Seguro]), CarModule],
  controllers: [ReservaController, SeguroController],
  providers: [
    ReservaService,
    ReservaRepository,
    ReservaProfile,
    SeguroService,
    SeguroRepository,
    SeguroProfile,
  ],
})
export class ReservaModule {}

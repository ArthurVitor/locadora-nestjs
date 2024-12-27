import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarProfile } from './profile/CarProfile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/Car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService, CarProfile],
})
export class CarModule {}

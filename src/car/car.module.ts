import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarProfile } from './profile/CarProfile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/Car.entity';
import { Category } from 'src/car/entities/Category.entity';
import { BrandService } from './brand.service';
import { CategoryService } from './category.service';
import { Brand } from './entities/Brand.entity';
import { CategoryProfile } from './profile/CategoryProfile';
import { BrandProfile } from './profile/BrandProfile';
import { Optionals } from './entities/Optionals.entity';
import { OptionalProfile } from './profile/OptionalProfile';
import { OptionalService } from './optional.service';
import { BrandController } from './brand.controller';
import { CategoryController } from './category.controller';
import { CarRepository } from './repositories/car.repository';
import { OptionalController } from './optional.controller';
import { BrandRepository } from './repositories/brand.repository';
import { OptionalsRepository } from './repositories/optionals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Category, Brand, Optionals])],
  controllers: [
    CarController,
    BrandController,
    CategoryController,
    OptionalController,
  ],
  providers: [
    CarService,
    CarProfile,
    BrandService,
    CategoryService,
    CategoryProfile,
    BrandProfile,
    OptionalProfile,
    OptionalService,
    CarRepository,
    BrandRepository,
    OptionalsRepository,
  ],
})
export class CarModule {}

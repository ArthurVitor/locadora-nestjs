import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateCarDto } from '../dtos/CreateCarDto';
import { Car } from '../entities/Car.entity';
import { CarBrandsEnum } from '../enums/CarBrandEnum';
import { CarCategoryEnum } from '../enums/CarCategoryEnum';
import { CarOptionalsEnum } from '../enums/CarOptionalEnum';
import { ListCarDto } from '../dtos/ListCarDto';

export class CarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateCarDto,
        Car,
        forMember(
          (dest) => dest.brand,
          mapFrom((source) => CarBrandsEnum[source.brand]),
        ),
        forMember(
          (dest) => dest.category,
          mapFrom((source) => CarCategoryEnum[source.category]),
        ),
        forMember(
          (dest) => dest.optionals,
          mapFrom((source) =>
            source.optionals.map((optional) => CarOptionalsEnum[optional]),
          ),
        ),
      );

      createMap(
        mapper,
        Car,
        ListCarDto,
        forMember(
          (dest) => dest.id,
          mapFrom((source) => source.id.toString()),
        ),
        forMember(
          (dest) => dest.optionals,
          mapFrom((source) => source.optionals.map((optional) => optional)),
        ),
      );
    };
  }
}

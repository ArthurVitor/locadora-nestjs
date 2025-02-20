import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { CarRepository } from './repositories/car.repository';
import { BrandRepository } from './repositories/brand.repository';
import { OptionalsRepository } from './repositories/optionals.repository';
import { CategoryRepository } from './repositories/category.repository';
import { createMapper, Mapper } from '@automapper/core';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/Car.entity';
import { Repository } from 'typeorm';
import { Brand } from './entities/Brand.entity';
import { Optionals } from './entities/Optionals.entity';
import { Category } from './entities/Category.entity';
import { classes } from '@automapper/classes';
import { CarProfile } from './profile/CarProfile';
import { CarStub } from './stub/CarStub';
import { CreateCarDto } from './dtos/Car/CreateCarDto';
import { CategoryStub } from './stub/CategoryStub';
import { BrandStub } from './stub/BrandStub';
import { OptionalsStub } from './stub/OptionalsStub';
import { NotFoundException } from '@nestjs/common';
import { BrandProfile } from './profile/BrandProfile';
import { OptionalProfile } from './profile/OptionalProfile';
import { CategoryProfile } from './profile/CategoryProfile';

describe('CarService', () => {
  let service: CarService;
  let carRepository: CarRepository;
  let brandRepository: BrandRepository;
  let optionalRepository: OptionalsRepository;
  let categoryRepository: CategoryRepository;
  let mapper: Mapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
        {
          provide: CarRepository,
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Brand),
          useClass: Repository,
        },
        {
          provide: BrandRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Optionals),
          useClass: Repository,
        },
        {
          provide: OptionalsRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
        {
          provide: CategoryRepository,
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
        CarProfile,
        BrandProfile,
        OptionalProfile,
        CategoryProfile,
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    carRepository = module.get<CarRepository>(
      CarRepository,
    ) as jest.Mocked<CarRepository>;
    brandRepository = module.get<BrandRepository>(
      BrandRepository,
    ) as jest.Mocked<BrandRepository>;
    optionalRepository = module.get<OptionalsRepository>(
      OptionalsRepository,
    ) as jest.Mocked<OptionalsRepository>;
    categoryRepository = module.get<CategoryRepository>(
      CategoryRepository,
    ) as jest.Mocked<CategoryRepository>;
    mapper = module.get<Mapper>(getMapperToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(carRepository).toBeDefined();
    expect(brandRepository).toBeDefined();
    expect(optionalRepository).toBeDefined();
    expect(categoryRepository).toBeDefined();
    expect(mapper).toBeDefined();
  });

  describe('create', () => {
    it('should create a car successfully', async () => {
      const createCarDto: CreateCarDto = CarStub.getCreateCarDto();
      const carEntity = CarStub.getValidCar();
      const carDto = CarStub.getValidCarDto();

      jest
        .spyOn(categoryRepository, 'findOneBy')
        .mockResolvedValue(CategoryStub.getValidCategory());

      jest
        .spyOn(brandRepository, 'findOneBy')
        .mockResolvedValue(BrandStub.getValidBrand());

      jest
        .spyOn(optionalRepository, 'findOneBy')
        .mockResolvedValue(OptionalsStub.getValidOptionals());

      jest.spyOn(carRepository, 'save').mockResolvedValue(carEntity);

      mapper.map = jest.fn().mockReturnValue(carDto);

      const result = await service.create(createCarDto);

      expect(result).toEqual(carEntity);
    });

    it('should throw an error if category does not exist', async () => {
      const createCarDto: CreateCarDto = CarStub.getCreateCarDto();

      jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createCarDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if brand does not exist', async () => {
      const createCarDto: CreateCarDto = CarStub.getCreateCarDto();

      jest.spyOn(brandRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createCarDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if optional does not exist', async () => {
      const createCarDto: CreateCarDto = CarStub.getCreateCarDto();

      jest.spyOn(optionalRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createCarDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAll', () => {
    it('should return all cars', async () => {
      const cars = [CarStub.getValidCar()];
      const carDto = [CarStub.getValidCarDto()];

      jest.spyOn(carRepository, 'findAll').mockResolvedValue(cars);

      mapper.mapArray = jest.fn().mockReturnValue(carDto);

      const result = await service.getAll(true);

      expect(result).toEqual(carDto);
      expect(result).toHaveLength(1);
    });

    it('should return no cars', async () => {
      const cars = [];

      jest.spyOn(carRepository, 'findAll').mockResolvedValue(cars);

      const result = await service.getAll(true);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});

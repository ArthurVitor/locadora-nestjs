import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserStub } from './stub/UserStub';
import { RolesRepository } from './repositories/roles.repository';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { UserProfile } from './profile/UserProfile';
import { User } from './entities/User.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/Role.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let rolesRepository: RolesRepository;
  let mapper: Mapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: UserRepository,
          useValue: {
            findOneBy: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
        {
          provide: RolesRepository,
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
        UserProfile,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(
      UserRepository,
    ) as jest.Mocked<UserRepository>;
    rolesRepository = module.get<RolesRepository>(
      RolesRepository,
    ) as jest.Mocked<RolesRepository>;
    mapper = module.get<Mapper>(getMapperToken());
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(rolesRepository).toBeDefined();
    expect(mapper).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a user', async () => {
      const user = UserStub.getValidUser();
      const userDto = UserStub.getValidListUserDto();

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      mapper.map = jest.fn().mockReturnValue(userDto);

      const result = await service.getById(1);
      expect(result).toEqual(userDto);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.getById(192313)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAll', () => {
    it('should return one user', async () => {
      const users = [UserStub.getValidUser()];
      const userDto = [UserStub.getValidListUserDto()];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      mapper.mapArray = jest.fn().mockReturnValue(userDto);

      const result = await service.getAll();
      expect(result).toEqual(userDto);
    });

    it('should return no user', async () => {
      const users = [];
      const userDto = [];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      mapper.mapArray = jest.fn().mockReturnValue(userDto);

      const result = await service.getAll();
      expect(result).toEqual(userDto);
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const userId = 1;

      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      await expect(service.delete(userId)).resolves.toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a valid user', async () => {
      const createUserDto = UserStub.getValidCreateUserDto();
      const user = UserStub.getValidUser();
      const listUserDto = UserStub.getValidListUserDto();

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      jest
        .spyOn(rolesRepository, 'findOneBy')
        .mockResolvedValue({ id: 1, name: 'user' });

      mapper.map = jest.fn().mockReturnValue(listUserDto);

      const result = await service.create(createUserDto);

      expect(result).toEqual(listUserDto);
    });

    it('should throw ConflictException if user already exists', async () => {
      const createUserDto = UserStub.getValidCreateUserDto();
      const existingUser = UserStub.getValidUser();

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userId = 1;
      const updateUserDto = {
        name: 'Arthur Updated',
        email: 'arthur.updated@email.com',
      };
      const existingUser = UserStub.getValidUser();
      const updatedUser = { ...existingUser, ...updateUserDto };
      const updatedUserDto = UserStub.getValidListUserDto();
      updatedUserDto.name = updateUserDto.name;
      updatedUserDto.email = updateUserDto.email;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);

      jest.spyOn(userRepository, 'save').mockResolvedValue(updatedUser);

      mapper.map = jest.fn().mockReturnValue(updatedUserDto);

      const result = await service.update(userId, updateUserDto);

      expect(result).toEqual(updatedUserDto);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 999;
      const updateUserDto = {
        name: 'Non-existent User',
        email: 'nonexistent@email.com',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

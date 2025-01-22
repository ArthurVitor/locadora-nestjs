import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateUserDto } from './dtos/User/CreateUserDto';
import { ListUserDto } from './dtos/User/ListUserDto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/User/UpdateUserDto';
import { UpdateUserRoleDto } from './dtos/User/UpdateUserRoleDto';
import { Role } from './entities/Role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(user: CreateUserDto): Promise<ListUserDto> {
    if (await this.userRepository.findOneBy({ email: user.email })) {
      throw new ConflictException(
        `User with email ${user.email} already exists`,
      );
    }

    user.password = await bcrypt.hash(user.password, 10);
    const entity = this.mapper.map(user, CreateUserDto, User);

    const userRole = await this.roleRepository.findOneBy({ name: 'user' });

    entity.roles = [];
    entity.roles.push(userRole);

    const createdUser = await this.userRepository.save(entity);

    return this.mapper.map(createdUser, User, ListUserDto);
  }

  async getAll(): Promise<ListUserDto[]> {
    const users = await this.userRepository.find();

    return this.mapper.mapArray(users, User, ListUserDto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getById(id: number): Promise<ListUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapper.map(user, User, ListUserDto);
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, body);
    this.userRepository.save(user);

    return this.mapper.map(user, User, ListUserDto);
  }

  async addRole(id: number, role: UpdateUserRoleDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const foundRole = await this.roleRepository.findOne({
      where: {
        name: role.name,
      },
    });

    if (!foundRole) {
      throw new NotFoundException(
        'Could not find role with name: ' + role.name,
      );
    }

    user.roles.push(foundRole);
    this.userRepository.save(user);

    return this.mapper.map(user, User, ListUserDto);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}

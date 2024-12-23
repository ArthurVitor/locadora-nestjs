import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateUserDto } from './dtos/User/CreateUserDto';
import { ListUserDto } from './dtos/User/ListUserDto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dtos/User/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: MongoRepository<User>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(user: CreateUserDto): Promise<ListUserDto> {
    user.password = await bcrypt.hash(user.password, 10);
    const createdUser = await this.userRepository.save(
      this.mapper.map(user, CreateUserDto, User),
    );

    return this.mapper.map(createdUser, User, ListUserDto);
  }

  async getAll(): Promise<ListUserDto[]> {
    const users = await this.userRepository.find();

    return this.mapper.mapArray(users, User, ListUserDto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getById(id: ObjectId): Promise<ListUserDto> {
    const user = await this.userRepository.findOneBy(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.mapper.map(user, User, ListUserDto);
  }

  async update(id: ObjectId, body: UpdateUserDto) {
    const user = await this.userRepository.findOneBy(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, body);
    this.userRepository.save(user);

    return this.mapper.map(user, User, ListUserDto);
  }
}

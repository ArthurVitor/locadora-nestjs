import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOneBy(
    key: keyof User,
    value: any,
    relations: string[] = [],
  ): Promise<User> {
    return this.userRepository.findOne({ [key]: value, relations: relations });
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async delete(id: number) {
    await this.userRepository.delete(id);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/Role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  find(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  insert(roles: Role[]) {
    this.rolesRepository.insert(roles);
  }

  findOneBy(key: keyof Role, value: any): Promise<Role> {
    return this.rolesRepository.findOne({ [key]: value });
  }
}

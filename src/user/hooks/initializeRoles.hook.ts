import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/Role.entity';
import { RolesEnum } from '../enums/RolesEnum';

@Injectable()
export class InitializeRoles implements OnModuleInit {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const rolesIntialized = await this.rolesRepository.find();

    if (rolesIntialized.length === 0) {
      const admin = new Role();
      admin.name = RolesEnum.ADMIN;

      const employee = new Role();
      employee.name = RolesEnum.USER;

      const user = new Role();
      user.name = RolesEnum.USER;

      this.rolesRepository.insert([admin, employee, user]);
    }
  }
}

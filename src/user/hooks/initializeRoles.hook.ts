import { Injectable, OnModuleInit } from '@nestjs/common';
import { Role } from '../entities/Role.entity';
import { RolesEnum } from '../enums/RolesEnum';
import { RolesRepository } from '../repositories/roles.repository';

@Injectable()
export class InitializeRoles implements OnModuleInit {
  constructor(private rolesRepository: RolesRepository) {}

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

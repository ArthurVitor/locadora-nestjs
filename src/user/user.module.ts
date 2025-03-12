import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserProfile } from 'src/user/profile/UserProfile';
import { Role } from './entities/Role.entity';
import { InitializeRoles } from './hooks/initializeRoles.hook';
import { RolesRepository } from './repositories/roles.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [
    UserService,
    UserProfile,
    InitializeRoles,
    RolesRepository,
    UserRepository,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/User/CreateUserDto';
import { ListUserDto } from './dtos/User/ListUserDto';
import { UpdateUserDto } from './dtos/User/UpdateUserDto';
import { UpdateUserRoleDto } from './dtos/User/UpdateUserRoleDto';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from './enums/RolesEnum';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async create(@Body() body: CreateUserDto): Promise<ListUserDto> {
    return await this.userService.create(body);
  }

  @Get()
  async getAll(): Promise<ListUserDto[]> {
    return await this.userService.getAll();
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<ListUserDto> {
    return await this.userService.getById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // ToDo: Only acessible by admin
  @Post(':id')
  @Roles(RolesEnum.ADMIN)
  async updateRole(@Param('id') id: number, @Body() role: UpdateUserRoleDto) {
    return this.userService.addRole(id, role);
  }
}

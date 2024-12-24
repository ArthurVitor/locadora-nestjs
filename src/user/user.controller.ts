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
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dtos/User/UpdateUserDto';
import { UpdateUserRoleDto } from './dtos/User/UpdateUserRoleDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
  async getById(@Param('id') id: string): Promise<ListUserDto> {
    const objectId = new ObjectId(id);
    return await this.userService.getById(objectId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const objectId = new ObjectId(id);
    return this.userService.update(objectId, updateUserDto);
  }

  // ToDo: Implement authorization where only allows ADMINs to acess
  @Patch(':id')
  async updateRole(@Param('id') id: string, @Body() role: UpdateUserRoleDto) {
    const objectId = new ObjectId(id);
    return this.userService.updateRole(objectId, role);
  }
}

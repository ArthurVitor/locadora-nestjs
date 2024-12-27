import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dtos/CreateCarDto';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from 'src/user/enums/RolesEnum';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';
import { ObjectId } from 'mongodb';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @Public()
  async getAll() {
    return await this.carService.getAll();
  }

  @Post()
  @Roles(RolesEnum.ADMIN)
  async create(@Body() dto: CreateCarDto) {
    return await this.carService.create(dto);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.carService.delete(id);
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: string) {
    const objectId = new ObjectId(id);
    return this.carService.getById(objectId);
  }
}

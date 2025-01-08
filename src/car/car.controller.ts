import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dtos/CreateCarDto';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from 'src/user/enums/RolesEnum';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';
import { ObjectId } from 'mongodb';
import { UpdateCarDto } from './dtos/UpdateCarDto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @Public()
  async getAll(@Query('isAvailable') isAvailable: boolean = true) {
    return await this.carService.getAll(isAvailable);
  }

  @Post()
  @Public()
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

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async patchCar(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    const objectId = new ObjectId(id);
    return this.carService.patch(objectId, dto);
  }
}

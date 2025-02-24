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
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';
import { CreateCarDto } from './dtos/Car/CreateCarDto';
import { UpdateCarDto } from './dtos/Car/UpdateCarDto';
import { RolesEnum } from 'src/user/enums/RolesEnum';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
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
  async delete(@Param('id') id: number) {
    this.carService.delete(id);
  }

  @Get(':id')
  @Public()
  async getById(@Param('id') id: number) {
    return this.carService.getById(id);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async patchCar(@Param('id') id: number, @Body() dto: UpdateCarDto) {
    return this.carService.patch(id, dto);
  }
}

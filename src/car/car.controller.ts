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
import { RolesEnum } from 'src/user/enums/RolesEnum';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';
import { CreateCarDto } from './dtos/Car/CreateCarDto';
import { UpdateCarDto } from './dtos/Car/UpdateCarDto';
import { CreateBrandDto } from './dtos/Brand/CreateBrandDto';
import { BrandService } from './brand.service';
import { CreateCategoryDto } from './dtos/Category/CreateCategoryDto';
import { CategoryService } from './category.service';
import { OptionalService } from './optional.service';

@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly optionalService: OptionalService,
  ) {}

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
  async getById(@Param('id') id: number) {
    return this.carService.getById(id);
  }

  @Patch(':id')
  @Roles(RolesEnum.ADMIN)
  async patchCar(@Param('id') id: number, @Body() dto: UpdateCarDto) {
    return this.carService.patch(id, dto);
  }

  @Post('brand/create')
  async createBrand(@Body() dto: CreateBrandDto) {
    return await this.brandService.create(dto);
  }

  @Post('category/create')
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Post('optional/create')
  async createOptional(@Body() dto: CreateCategoryDto) {
    return await this.optionalService.create(dto);
  }
}

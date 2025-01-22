import { Body, Controller, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/Brand/CreateBrandDto';

@Controller()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }
}

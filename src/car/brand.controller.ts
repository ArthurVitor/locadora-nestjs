import { Body, Controller, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/Brand/CreateBrandDto';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from 'src/user/enums/RolesEnum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('brands')
@ApiBearerAuth()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateBrandDto) {
    return this.brandService.create(body);
  }
}

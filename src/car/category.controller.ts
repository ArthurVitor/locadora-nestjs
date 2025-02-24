import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/Category/CreateCategoryDto';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from 'src/user/enums/RolesEnum';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Public()
  @Get()
  getAll() {
    return this.categoryService.getAll();
  }
}

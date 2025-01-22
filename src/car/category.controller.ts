import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/Category/CreateCategoryDto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }
}

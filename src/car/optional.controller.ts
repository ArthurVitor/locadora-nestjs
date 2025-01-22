import { Body, Controller, Post } from '@nestjs/common';
import { OptionalService } from './optional.service';
import { CreateOptionalDto } from './dtos/Optional/CreateOptionalDto';

@Controller()
export class OptionalController {
  constructor(private readonly optionalService: OptionalService) {}

  @Post()
  create(@Body() body: CreateOptionalDto) {
    return this.optionalService.create(body);
  }
}

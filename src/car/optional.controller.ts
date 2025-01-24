import { Body, Controller, Post } from '@nestjs/common';
import { OptionalService } from './optional.service';
import { CreateOptionalDto } from './dtos/Optional/CreateOptionalDto';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from 'src/user/enums/RolesEnum';

@Controller('optionals')
export class OptionalController {
  constructor(private readonly optionalService: OptionalService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateOptionalDto) {
    return this.optionalService.create(body);
  }
}

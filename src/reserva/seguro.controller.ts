import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';
import { SeguroService } from './seguro.service';
import { CreateSeguroDto } from './dtos/Seguro/CreateSeguroDto';

@Controller('seguro')
export class SeguroController {
  constructor(private readonly seguroService: SeguroService) {}

  @Post()
  @Public()
  create(@Body() dto: CreateSeguroDto) {
    return this.seguroService.create(dto);
  }
}

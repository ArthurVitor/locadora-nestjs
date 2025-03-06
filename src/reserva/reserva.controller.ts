import { Body, Controller, Post } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dtos/Reserva/CreateReservaDto';
import { Public } from 'src/auth/infra/security/decorator/isPublic.decorator';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  @Public()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }
}

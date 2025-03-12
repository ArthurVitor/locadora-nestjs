import { Body, Controller, Post } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dtos/Reserva/CreateReservaDto';
import { Roles } from 'src/auth/infra/security/decorator/Roles.decorator';
import { RolesEnum } from 'src/user/enums/RolesEnum';
import { CreateCheckinDto } from './dtos/Reserva/CreateCheckinDto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  @Roles(RolesEnum.EMPLOYEE)
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Post('checkin/')
  checkin(@Body() dto: CreateCheckinDto) {
    return this.reservaService.checkin(dto);
  }
}

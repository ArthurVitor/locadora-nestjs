import { Body, Controller, Post } from '@nestjs/common';
import { ItemReservaService } from './itemReserva.service';
import { CreateItemReservaDto } from './dtos/ItemReserva/CreateItemReservaDto';

@Controller('itemReserva')
export class ItemReservaController {
  constructor(private readonly itemReservaService: ItemReservaService) {}

  @Post()
  create(@Body() dto: CreateItemReservaDto) {
    return this.itemReservaService.create(dto);
  }
}

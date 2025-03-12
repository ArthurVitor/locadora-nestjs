import { ListReservaDto } from './ListReservaDto';

export class ListCheckinDto {
  total: number;

  reserva: ListReservaDto;

  user: { id: number; name: string };
}

import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './CreateCarDto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}

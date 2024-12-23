import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../User/CreateUserDto';

export class UpdateAddressDto extends PartialType(CreateUserDto) {}

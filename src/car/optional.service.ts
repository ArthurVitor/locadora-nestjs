import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Optionals } from './entities/Optionals.entity';
import { CreateOptionalDto } from './dtos/Optional/CreateOptionalDto';
import { Injectable } from '@nestjs/common';
import { OptionalsRepository } from './repositories/optionals.repository';

@Injectable()
export class OptionalService {
  constructor(
    private optionalRepository: OptionalsRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateOptionalDto) {
    const entity = this.mapper.map(dto, CreateOptionalDto, Optionals);

    return this.optionalRepository.save(entity);
  }
}

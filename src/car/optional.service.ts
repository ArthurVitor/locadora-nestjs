import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Optionals } from './entities/Optionals.entity';
import { CreateOptionalDto } from './dtos/Optional/CreateOptionalDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionalService {
  constructor(
    @InjectRepository(Optionals)
    private optionalRepository: Repository<Optionals>,

    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateOptionalDto) {
    const entity = this.mapper.map(dto, CreateOptionalDto, Optionals);

    return await this.optionalRepository.save(entity);
  }
}

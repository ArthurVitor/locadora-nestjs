import { Injectable } from '@nestjs/common';
import { SeguroRepository } from './repositories/seguro.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateSeguroDto } from './dtos/Seguro/CreateSeguroDto';
import { ListSeguroDto } from './dtos/Seguro/ListSeguroDto';
import { Seguro } from './entities/Seguro.entity';

@Injectable()
export class SeguroService {
  constructor(
    private seguroRepository: SeguroRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateSeguroDto): Promise<ListSeguroDto> {
    const entity = this.mapper.map(dto, CreateSeguroDto, Seguro);

    return this.mapper.map(
      await this.seguroRepository.save(entity),
      Seguro,
      ListSeguroDto,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { Brand } from './entities/Brand.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateBrandDto } from './dtos/Brand/CreateBrandDto';
import { BrandRepository } from './repositories/brand.repository';

@Injectable()
export class BrandService {
  constructor(
    private brandRepository: BrandRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateBrandDto) {
    return await this.brandRepository.save(
      this.mapper.map(dto, CreateBrandDto, Brand),
    );
  }
}

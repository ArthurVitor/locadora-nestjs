import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/Brand.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateBrandDto } from './dtos/Brand/CreateBrandDto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async create(dto: CreateBrandDto) {
    return await this.brandRepository.save(
      this.mapper.map(dto, CreateBrandDto, Brand),
    );
  }
}

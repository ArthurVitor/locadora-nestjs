import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/Brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findOneBy(key: keyof Brand, value: any): Promise<Brand> {
    return this.brandRepository.findOneBy({ [key]: value });
  }

  save(brand: Brand): Promise<Brand> {
    return this.brandRepository.save(brand);
  }
}

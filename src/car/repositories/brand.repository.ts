import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/Brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async findOneBy(key: keyof Brand, value: any): Promise<Brand> {
    const brand = await this.brandRepository.findOne({
      where: { [key]: value },
    });
    if (!brand) {
      throw new NotFoundException(
        'Could not find brand with ' + key + ' ' + value,
      );
    }

    return brand;
  }

  save(brand: Brand): Promise<Brand> {
    return this.brandRepository.save(brand);
  }
}

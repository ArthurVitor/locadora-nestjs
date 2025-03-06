import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seguro } from '../entities/Seguro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeguroRepository {
  constructor(
    @InjectRepository(Seguro) private repository: Repository<Seguro>,
  ) {}

  async save(entity: Seguro): Promise<Seguro> {
    return await this.repository.save(entity);
  }

  async findOneBy(key: keyof Seguro, value: any): Promise<Seguro> {
    const seguro = await this.repository.findOne({
      where: { [key]: value },
    });

    if (!seguro) {
      throw new NotFoundException(
        `Could not find seguro with ${key}: ${value}`,
      );
    }

    return seguro;
  }
}

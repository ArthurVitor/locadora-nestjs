import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optionals } from '../entities/Optionals.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionalsRepository {
  constructor(
    @InjectRepository(Optionals)
    private optionalsRepository: Repository<Optionals>,
  ) {}

  async findOneBy(key: keyof Optionals, value: any): Promise<Optionals> {
    const optional = await this.optionalsRepository.findOne({
      where: { [key]: value },
    });
    if (!optional) {
      throw new NotFoundException(
        'Could not find optional with ' + key + ' ' + value,
      );
    }

    return optional;
  }

  save(optionals: Optionals): Promise<Optionals> {
    return this.optionalsRepository.save(optionals);
  }
}

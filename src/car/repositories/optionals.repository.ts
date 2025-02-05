import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Optionals } from '../entities/Optionals.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionalsRepository {
  constructor(
    @InjectRepository(Optionals)
    private optionalsRepository: Repository<Optionals>,
  ) {}

  findOneBy(key: keyof Optionals, value: any): Promise<Optionals> {
    return this.optionalsRepository.findOneBy({ [key]: value });
  }

  save(optionals: Optionals): Promise<Optionals> {
    return this.optionalsRepository.save(optionals);
  }
}

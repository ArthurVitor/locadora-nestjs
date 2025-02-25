import { CreateCarDto } from './CreateCarDto';

export type GetCarsFilterDto = Partial<Omit<CreateCarDto, 'plate' | 'year'>>;

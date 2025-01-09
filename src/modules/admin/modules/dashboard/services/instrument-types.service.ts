import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentType } from '../../../../../database/entities/instrument_types.entity';

export class CreateInstrumentTypeDto {
  type_code: string;
  description: string;
}

export class UpdateInstrumentTypeDto {
  description?: string;
}

@Injectable()
export class InstrumentTypesService {
  constructor(
    @InjectRepository(InstrumentType)
    private typeRepo: Repository<InstrumentType>,
  ) {}

  async create(createDto: CreateInstrumentTypeDto) {
    const existingType = await this.typeRepo.findOne({
      where: { type_code: createDto.type_code },
    });

    if (existingType) {
      throw new ConflictException(
        `Instrument type with code ${createDto.type_code} already exists`,
      );
    }

    const type = this.typeRepo.create(createDto);
    return this.typeRepo.save(type);
  }

  async findAll() {
    return this.typeRepo.find({
      order: {
        type_code: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const type = await this.typeRepo.findOne({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException(`Instrument type with ID ${id} not found`);
    }

    return type;
  }

  async findByCode(typeCode: string) {
    const type = await this.typeRepo.findOne({
      where: { type_code: typeCode },
    });

    if (!type) {
      throw new NotFoundException(
        `Instrument type with code ${typeCode} not found`,
      );
    }

    return type;
  }

  async update(id: number, updateDto: UpdateInstrumentTypeDto) {
    const type = await this.findOne(id);
    Object.assign(type, updateDto);
    return this.typeRepo.save(type);
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    return this.typeRepo.remove(type);
  }

  async getTypeUsageStatistics(id: number) {
    return this.typeRepo
      .createQueryBuilder('type')
      .leftJoin('type.instruments', 'instruments')
      .where('type.id = :id', { id })
      .select([
        'type.type_code',
        'COUNT(DISTINCT instruments.id) as total_instruments',
        'COUNT(DISTINCT instruments.value) as unique_values',
      ])
      .groupBy('type.id')
      .getRawOne();
  }
}

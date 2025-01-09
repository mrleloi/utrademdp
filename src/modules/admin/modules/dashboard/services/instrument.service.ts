/*
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instrument } from '../../../../../database/entities/instrument.entity';
import { ApiProperty } from "@nestjs/swagger";

export class CreateInstrumentDto {
  instrumentType: number;
  value: string;
}

export class UpdateInstrumentDto {
  instrumentType: number;
  value: string;
}

@Injectable()
export class InstrumentsService {
  constructor(
    @InjectRepository(Instrument)
    private instrumentRepo: Repository<Instrument>,
  ) {}

  async create(createDto: CreateInstrumentDto) {
    const instrument = this.instrumentRepo.create(createDto);
    return this.instrumentRepo.save(instrument);
  }

  async findAll(options?: {
    typeId?: number;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { typeId, search, page = 1, limit = 10 } = options || {};

    const query = this.instrumentRepo
      .createQueryBuilder('instrument')
      .leftJoinAndSelect('instrument.instrumentType', 'type');

    if (typeId) {
      query.andWhere('type.id = :typeId', { typeId });
    }
    if (search) {
      query.andWhere('instrument.value LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [items, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const instrument = await this.instrumentRepo.findOne({
      where: { id },
      relations: ['instrumentType'],
    });

    if (!instrument) {
      throw new NotFoundException(`Instrument with ID ${id} not found`);
    }

    return instrument;
  }

  async findByValue(typeId: number, value: string) {
    return this.instrumentRepo.findOne({
      where: {
        instrumentType: { id: typeId },
        value,
      },
      relations: ['instrumentType'],
    });
  }

  async update(id: number, updateDto: UpdateInstrumentDto) {
    const instrument = await this.findOne(id);
    Object.assign(instrument, updateDto);
    return this.instrumentRepo.save(instrument);
  }

  async remove(id: number) {
    const instrument = await this.findOne(id);
    return this.instrumentRepo.remove(instrument);
  }

  async bulkCreate(instruments: CreateInstrumentDto[]) {
    const createdInstruments = this.instrumentRepo.create(instruments);
    return this.instrumentRepo.save(createdInstruments);
  }
}
*/

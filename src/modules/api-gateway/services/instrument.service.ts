import { Instrument } from '../../../database/entities/instrument.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentType } from '../../../database/entities/instrument_types.entity';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(InstrumentType)
    private instrumentTypeRepo: Repository<InstrumentType>,
    @InjectRepository(Instrument)
    private instrumentRepo: Repository<Instrument>,
  ) {}

  async findOrCreateInstrument(
    typeCode: string,
    value: string,
  ): Promise<Instrument> {
    const type = await this.instrumentTypeRepo.findOne({
      where: { type_code: typeCode },
    });

    if (!type) {
      throw new Error(`Invalid instrument type: ${typeCode}`);
    }

    let instrument = await this.instrumentRepo.findOne({
      where: {
        instrumentType: { id: type.id },
        value: value,
      },
      relations: ['instrumentType'],
    });

    if (!instrument) {
      instrument = await this.instrumentRepo.save({
        instrumentType: type,
        value: value,
        created_at: new Date(),
      });
    }

    return instrument;
  }
}

import { InstrumentType } from '../entities/instrument_types.entity';
import { DataSource } from 'typeorm';

export const seedInstrumentTypes = async (dataSource: DataSource) => {
  const instrumentTypeRepo = dataSource.getRepository(InstrumentType);

  const defaultTypes = [
    { type_code: 'ric', description: 'Reuters Instrument Code' },
    { type_code: 'ticker', description: 'Stock Ticker Symbol' },
    { type_code: 'exchangeCode', description: 'Exchange Code' },
  ];

  for (const type of defaultTypes) {
    const existing = await instrumentTypeRepo.findOne({
      where: { type_code: type.type_code },
    });

    if (!existing) {
      await instrumentTypeRepo.save({
        ...type,
        created_at: new Date(),
      });
    }
  }
};

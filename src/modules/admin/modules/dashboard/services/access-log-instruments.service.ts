import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiAccessLogInstrument } from '../../../../../database/entities/api_access_log_instruments.entity';
import { ApiUser } from '../../../../../database/entities/api_users.entity';
import { InstrumentType } from '../../../../../database/entities/instrument_types.entity';

@Injectable()
export class AccessLogInstrumentsService {
  constructor(
    @InjectRepository(ApiAccessLogInstrument)
    private accessLogInstrumentRepo: Repository<ApiAccessLogInstrument>,
  ) {}

  async findByAccessLog(accessLogId: number) {
    return this.accessLogInstrumentRepo.find({
      where: { accessLog: { id: accessLogId } },
      relations: ['instrumentType'],
    });
  }

  async getTopInstruments(options: {
    apiUser?: ApiUser;
    instrumentType?: InstrumentType;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { apiUser, instrumentType, limit = 10, startDate, endDate } = options;

    const query = this.accessLogInstrumentRepo
      .createQueryBuilder('log_instrument')
      .leftJoinAndSelect('log_instrument.instrumentType', 'type')
      .leftJoinAndSelect('log_instrument.accessLog', 'log')
      .select([
        'type.type_code as type',
        'log_instrument.instrument_value as value',
        'COUNT(*) as count',
      ])
      .groupBy('type.type_code')
      .addGroupBy('log_instrument.instrument_value');

    if (apiUser) {
      query.andWhere('log.apiUser.id = :userId', { userId: apiUser.id });
    }
    if (instrumentType) {
      query.andWhere('type.id = :typeId', { typeId: instrumentType.id });
    }
    if (startDate) {
      query.andWhere('log.access_time >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('log.access_time <= :endDate', { endDate });
    }

    return query.orderBy('count', 'DESC').limit(limit).getRawMany();
  }

  async getInstrumentUsageByType(options: {
    apiUserId?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const query = this.accessLogInstrumentRepo
      .createQueryBuilder('log_instrument')
      .leftJoinAndSelect('log_instrument.instrumentType', 'type')
      .leftJoinAndSelect('log_instrument.accessLog', 'log')
      .select([
        'type.type_code as type',
        'COUNT(*) as total_usage',
        'COUNT(DISTINCT log_instrument.instrument_value) as unique_values',
      ])
      .groupBy('type.type_code');

    if (options.apiUserId) {
      query.andWhere('log.apiUser.id = :userId', {
        userId: options.apiUserId,
      });
    }
    if (options.startDate) {
      query.andWhere('log.access_time >= :startDate', {
        startDate: options.startDate,
      });
    }
    if (options.endDate) {
      query.andWhere('log.access_time <= :endDate', {
        endDate: options.endDate,
      });
    }

    return query.getRawMany();
  }
}

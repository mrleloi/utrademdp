/*
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instrument } from '../entities/instrument.entity';
import { AccessLog } from '../entities/access-log.entity';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  constructor(
    @InjectRepository(Instrument)
    private instrumentRepository: Repository<Instrument>,
    @InjectRepository(AccessLog)
    private accessLogRepository: Repository<AccessLog>,
  ) {}

  async logApiAccess(data: {
    apiId: number;
    userId: string;
    requestParams: any;
    responseStatus: number;
    responseTime: number;
  }) {
    try {
      // Find or create instrument
      let instrument = null;
      if (data.requestParams.ric || (data.requestParams.ticker && data.requestParams.exchange)) {
        instrument = await this.findOrCreateInstrument({
          ric: data.requestParams.ric,
          ticker: data.requestParams.ticker,
          exchange: data.requestParams.exchange,
        });
      }

      // Create access log
      const accessLog = this.accessLogRepository.create({
        api_id: data.apiId,
        user_id: data.userId,
        instrument: instrument,
        request_params: data.requestParams,
        response_status: data.responseStatus,
        response_time: data.responseTime,
      });

      await this.accessLogRepository.save(accessLog);

      // Update statistics asynchronously
      this.updateStatistics(data.apiId, data.userId, instrument?.id).catch(err => {
        this.logger.error(`Error updating statistics: ${err.message}`);
      });
    } catch (error) {
      this.logger.error(`Error logging API access: ${error.message}`);
      throw error;
    }
  }

  private async findOrCreateInstrument(data: {
    ric?: string;
    ticker?: string;
    exchange?: string;
  }): Promise<Instrument> {
    let instrument = await this.instrumentRepository.findOne({
      where: {
        ric: data.ric,
        ticker: data.ticker,
        exchange: data.exchange,
      },
    });

    if (!instrument) {
      instrument = this.instrumentRepository.create(data);
      await this.instrumentRepository.save(instrument);
    }

    return instrument;
  }

  private async updateStatistics(
    apiId: number,
    userId: string,
    instrumentId?: number,
  ) {
    const date = new Date().toISOString().split('T')[0];

    await this.dataSource.query(`
      INSERT INTO usage_statistics 
        (api_id, user_id, instrument_id, date, request_count, last_access)
      VALUES 
        (?, ?, ?, ?, 1, NOW())
      ON DUPLICATE KEY UPDATE
        request_count = request_count + 1,
        last_access = NOW()
    `, [apiId, userId, instrumentId, date]);
  }
}*/

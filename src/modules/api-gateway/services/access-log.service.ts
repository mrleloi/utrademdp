import { InstrumentService } from '@modules/api-gateway/services/instrument.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiAccessLog } from '../../../database/entities/api_access_logs.entity';
import { Repository } from 'typeorm';
import { ApiAccessLogInstrument } from '../../../database/entities/api_access_log_instruments.entity';
import { ApiEndpoint } from '../../../database/entities/api_endpoints.entity';
import { Request } from 'express';
import { ApiUser } from '../../../database/entities/api_users.entity';

@Injectable()
export class AccessLogService {
  constructor(
    @InjectRepository(ApiAccessLog)
    private accessLogRepo: Repository<ApiAccessLog>,
    @InjectRepository(ApiAccessLogInstrument)
    private accessLogInstrumentRepo: Repository<ApiAccessLogInstrument>,
    private instrumentService: InstrumentService,
  ) {}

  async logAccess(
    user: ApiUser,
    endpoint: ApiEndpoint,
    request: Request,
    response: any,
    instrumentParams: Record<string, string>,
  ) {
    const dataAccessLog = {
      apiUser: user,
      apiEndpoint: endpoint,
      request_params: {
        query: request.query,
        body: request.body,
      },
      access_time: new Date(),
      response_status: response.status,
      error_message: response.status >= 400 ? response.data : null,
    };
    const accessLog = await this.accessLogRepo.save(dataAccessLog);

    // Log instruments
    for (const [typeCode, value] of Object.entries(instrumentParams)) {
      try {
        const instrument = await this.instrumentService.findOrCreateInstrument(
          typeCode,
          value,
        );

        await this.accessLogInstrumentRepo.save({
          accessLog: accessLog,
          instrumentType: instrument.instrumentType,
          instrument_value: instrument.value,
          created_at: new Date(),
        });
      } catch (error) {
        console.error(`Error logging instrument access: ${error.message}`);
      }
    }

    return accessLog;
  }
}

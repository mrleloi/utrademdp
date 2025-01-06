import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiAccessHistory } from '../entities/api-access.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(ApiAccessHistory)
    private accessRepo: Repository<ApiAccessHistory>,
  ) {}

  async logAccess(data: {
    apiName: string;
    userId: string;
    ric?: string;
    ticker?: string;
    exchange?: string;
    params: any;
  }) {
    // Lưu lịch sử truy cập
    const access = this.accessRepo.create({
      api_name: data.apiName,
      user_id: data.userId,
      ric: data.ric,
      ticker: data.ticker,
      exchange: data.exchange,
      request_params: data.params
    });

    await this.accessRepo.save(access);

    // Update thống kê hàng ngày
    const today = new Date().toISOString().split('T')[0];
    await this.statsRepo.query(`
            INSERT INTO daily_api_stats (date, api_name, user_id, access_count)
            VALUES (?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE access_count = access_count + 1
        `, [today, data.apiName, data.userId]);
  }

  async getAccessHistory(query: {
    userId?: string;
    apiName?: string;
    startDate: Date;
    endDate: Date;
    page: number;
    limit: number;
  }) {
    const qb = this.accessRepo.createQueryBuilder('access')
      .where('access.access_time BETWEEN :startDate AND :endDate', {
        startDate: query.startDate,
        endDate: query.endDate
      });

    if (query.userId) {
      qb.andWhere('access.user_id = :userId', { userId: query.userId });
    }

    if (query.apiName) {
      qb.andWhere('access.api_name = :apiName', { apiName: query.apiName });
    }

    return qb
      .orderBy('access.access_time', 'DESC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();
  }
}
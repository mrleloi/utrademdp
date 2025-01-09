import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiAccessLog } from '../../../../../database/entities/api_access_logs.entity';
import { ApiUser } from '../../../../../database/entities/api_users.entity';

@Injectable()
export class AccessLogsService {
  constructor(
    @InjectRepository(ApiAccessLog)
    private accessLogRepo: Repository<ApiAccessLog>,
  ) {}

  async findAll(options: {
    userId?: number;
    endpointId?: number;
    startDate?: Date;
    endDate?: Date;
    status?: number;
    page?: number;
    limit?: number;
  }) {
    const {
      page = 1,
      limit = 10,
      userId,
      endpointId,
      startDate,
      endDate,
      status,
    } = options;

    const query = this.accessLogRepo
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.apiUser', 'user')
      .leftJoinAndSelect('log.apiEndpoint', 'endpoint')
      .leftJoinAndSelect('endpoint.apiGroup', 'group');

    if (userId) {
      query.andWhere('user.id = :userId', { userId });
    }
    if (endpointId) {
      query.andWhere('endpoint.id = :endpointId', { endpointId });
    }
    if (startDate) {
      query.andWhere('log.access_time >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('log.access_time <= :endDate', { endDate });
    }
    if (status) {
      query.andWhere('log.response_status = :status', { status });
    }

    const [items, total] = await query
      .orderBy('log.access_time', 'DESC')
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

  async getStatsByApiUser(
    apiUser: ApiUser,
    dateRange?: { startDate: Date; endDate: Date },
  ) {
    const query = this.accessLogRepo
      .createQueryBuilder('log')
      .select([
        'COUNT(*) as total_requests',
        'AVG(CASE WHEN log.response_status < 400 THEN 1 ELSE 0 END) * 100 as success_rate',
        'MAX(log.access_time) as last_access',
      ])
      .where('log.apiUser.id = :userId', { userId: apiUser.id });

    if (dateRange) {
      query
        .andWhere('log.access_time >= :startDate', {
          startDate: dateRange.startDate,
        })
        .andWhere('log.access_time <= :endDate', {
          endDate: dateRange.endDate,
        });
    }

    return query.getRawOne();
  }

  async getTopEndpointsByApiUser(apiUser: ApiUser, limit = 5) {
    return this.accessLogRepo
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.apiEndpoint', 'endpoint')
      .select([
        'endpoint.endpoint_pattern as endpoint',
        'COUNT(*) as count',
        'AVG(CASE WHEN log.response_status < 400 THEN 1 ELSE 0 END) * 100 as success_rate',
      ])
      .where('log.apiUser.id = :userId', { userId: apiUser.id })
      .groupBy('endpoint.endpoint_pattern')
      .orderBy('count', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getErrorStats(options: {
    apiUser?: ApiUser;
    startDate?: Date;
    endDate?: Date;
  }) {
    const query = this.accessLogRepo
      .createQueryBuilder('log')
      .select([
        'log.response_status as status',
        'COUNT(*) as count',
        "STRING_AGG(DISTINCT log.error_message, '|') as error_messages",
      ])
      .where('log.response_status >= :errorCode', { errorCode: 400 });

    if (options.apiUser) {
      query.andWhere('log.apiUser.id = :userId', {
        userId: options.apiUser.id,
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

    return query
      .groupBy('log.response_status')
      .orderBy('count', 'DESC')
      .getRawMany();
  }
}

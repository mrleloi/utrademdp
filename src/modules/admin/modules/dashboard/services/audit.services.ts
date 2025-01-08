/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiAccessHistory } from '../entities/api-access.entity';
import { ApiId } from "../../../../../shared/constants/api.constant";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(ApiAccessHistory)
    private accessRepo: Repository<ApiAccessHistory>,
  ) {}

  async getAccessLogs(filters: {
    apiId?: ApiId;
    username?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const query = this.accessRepo.createQueryBuilder('log');

    if (filters.apiId) {
      query.andWhere('log.apiId = :apiId', { apiId: filters.apiId });
    }
    if (filters.username) {
      query.andWhere('log.username = :username', { username: filters.username });
    }
    if (filters.startDate) {
      query.andWhere('log.createdAt >= :startDate', { startDate: filters.startDate });
    }
    if (filters.endDate) {
      query.andWhere('log.createdAt <= :endDate', { endDate: filters.endDate });
    }

    return query
      .orderBy('log.createdAt', 'DESC')
      .getMany();
  }
}*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiUser } from '../../../../../database/entities/api_users.entity';
import { ApiUserPermission } from '../../../../../database/entities/api_user_permissions.entity';
import { ApiAccessLog } from '../../../../../database/entities/api_access_logs.entity';
import { ApiAccessLogInstrument } from '../../../../../database/entities/api_access_log_instruments.entity';
import { AccessLogsService } from './access-logs.service';
import { AccessLogInstrumentsService } from './access-log-instruments.service';

export class CreateApiUserDto {
  username: string;
  status: string;
}

export class UpdateApiUserDto {
  status?: string;
}

@Injectable()
export class ApiUserService {
  constructor(
    @InjectRepository(ApiUser)
    private apiUserRepo: Repository<ApiUser>,
    @InjectRepository(ApiUserPermission)
    private permissionRepo: Repository<ApiUserPermission>,
    @InjectRepository(ApiAccessLog)
    private accessLogRepo: Repository<ApiAccessLog>,
    @InjectRepository(ApiAccessLogInstrument)
    private accessLogInstrumentRepo: Repository<ApiAccessLogInstrument>,
    private accessLogsService: AccessLogsService,
    private accessLogInstrumentsService: AccessLogInstrumentsService,
  ) {}

  async create(createDto: CreateApiUserDto) {
    const user = this.apiUserRepo.create(createDto);
    return this.apiUserRepo.save(user);
  }

  async findAll(options?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { status, search, page = 1, limit = 10 } = options || {};

    const query = this.apiUserRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.permissions', 'permissions')
      .leftJoinAndSelect('permissions.apiGroup', 'group')
      .leftJoinAndSelect('permissions.apiEndpoint', 'endpoint');

    if (status) {
      query.andWhere('user.status = :status', { status });
    }
    if (search) {
      query.andWhere('user.username LIKE :search', { search: `%${search}%` });
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
    const user = await this.apiUserRepo.findOne({
      where: { id },
      relations: [
        'permissions',
        'permissions.apiGroup',
        'permissions.apiEndpoint',
      ],
    });

    if (!user) {
      throw new NotFoundException(`API User with ID ${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.apiUserRepo.findOne({
      where: { username },
      relations: [
        'permissions',
        'permissions.apiGroup',
        'permissions.apiEndpoint',
      ],
    });

    if (!user) {
      throw new NotFoundException(
        `API User with username ${username} not found`,
      );
    }

    return user;
  }

  async update(id: number, updateDto: UpdateApiUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateDto);
    return this.apiUserRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.apiUserRepo.remove(user);
  }

  async getUserAccessHistory(
    id: number,
    options?: {
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    },
  ) {
    const user = await this.findOne(id);
    return this.accessLogsService.findAll({
      userId: user.id,
      ...options,
    });
  }

  // Cần sửa các phương thức khác tương tự
  async getUserStatistics(id: number) {
    const user = await this.findOne(id);

    const [accessStats, topEndpoints, instrumentUsage] = await Promise.all([
      this.accessLogsService.getStatsByApiUser(user), // This method might need updating in AccessLogsService
      this.accessLogsService.getTopEndpointsByApiUser(user), // This method might need updating in AccessLogsService
      this.accessLogInstrumentsService.getInstrumentUsageByType({
        apiUserId: user.id,
      }),
    ]);

    return {
      user,
      statistics: {
        access: accessStats,
        topEndpoints,
        instrumentUsage,
      },
    };
  }

  async getApiUserDetail(id: number) {
    const apiUser = await this.apiUserRepo.findOne({
      where: { id },
      relations: [
        'permissions',
        'permissions.apiGroup',
        'permissions.apiEndpoint',
      ],
    });

    if (!apiUser) {
      throw new NotFoundException(`API User with id ${id} not found`);
    }

    // Get usage statistics
    const stats = await this.getApiUserStats(id);

    // Format permissions
    const formattedPermissions = apiUser.permissions.map((permission) => ({
      permission_level: permission.permission_level,
      group_code: permission.apiGroup?.group_code,
      endpoint_pattern: permission.apiEndpoint?.endpoint_pattern,
      allowed_instruments: permission.allowed_instruments,
      is_active: permission.is_active,
    }));

    return {
      id: apiUser.id,
      username: apiUser.username,
      status: apiUser.status,
      created_at: apiUser.created_at,
      updated_at: apiUser.updated_at,
      permissions: formattedPermissions,
      stats,
    };
  }

  private async getApiUserStats(userId: number) {
    // Get total requests and success rate
    const accessStats = await this.accessLogRepo
      .createQueryBuilder('log')
      .select([
        'COUNT(*) as total',
        'AVG(CASE WHEN log.response_status < 400 THEN 1 ELSE 0 END) * 100 as success_rate',
        'MAX(log.access_time) as last_access',
      ])
      .where('log.apiUser.id = :userId', { userId })
      .getRawOne();

    // Get most used endpoints
    const topEndpoints = await this.accessLogRepo
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.apiEndpoint', 'endpoint')
      .select(['endpoint.endpoint_pattern as endpoint', 'COUNT(*) as count'])
      .where('log.apiUser.id = :userId', { userId })
      .groupBy('endpoint.endpoint_pattern')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    // Get most used instruments
    const topInstruments = await this.accessLogInstrumentRepo
      .createQueryBuilder('log_instrument')
      .leftJoinAndSelect('log_instrument.instrumentType', 'type')
      .leftJoinAndSelect('log_instrument.accessLog', 'log')
      .select([
        'type.type_code as type',
        'log_instrument.instrument_value as value',
        'COUNT(*) as count',
      ])
      .where('log.apiUser.id = :userId', { userId })
      .groupBy('type.type_code')
      .addGroupBy('log_instrument.instrument_value')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    return {
      total_requests: parseInt(accessStats.total),
      success_rate: parseFloat(accessStats.success_rate),
      last_access: accessStats.last_access,
      most_used_endpoints: topEndpoints,
      most_used_instruments: topInstruments,
    };
  }
}

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiGroup } from '../../../../../database/entities/api_groups.entity';

export class CreateApiGroupDto {
  group_code: string;
  description: string;
}

export class UpdateApiGroupDto {
  description?: string;
}

@Injectable()
export class ApiGroupsService {
  constructor(
    @InjectRepository(ApiGroup)
    private groupRepo: Repository<ApiGroup>,
  ) {}

  async create(createDto: CreateApiGroupDto) {
    const existingGroup = await this.groupRepo.findOne({
      where: { group_code: createDto.group_code },
    });

    if (existingGroup) {
      throw new ConflictException(
        `Group with code ${createDto.group_code} already exists`,
      );
    }

    const group = this.groupRepo.create(createDto);
    return this.groupRepo.save(group);
  }

  async findAll() {
    return this.groupRepo.find({
      relations: ['endpoints'],
      order: {
        group_code: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['endpoints'],
    });

    if (!group) {
      throw new NotFoundException(`API Group with ID ${id} not found`);
    }

    return group;
  }

  async findByCode(groupCode: string) {
    const group = await this.groupRepo.findOne({
      where: { group_code: groupCode },
      relations: ['endpoints'],
    });

    if (!group) {
      throw new NotFoundException(`API Group with code ${groupCode} not found`);
    }

    return group;
  }

  async update(id: number, updateDto: UpdateApiGroupDto) {
    const group = await this.findOne(id);
    Object.assign(group, updateDto);
    return this.groupRepo.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    return this.groupRepo.remove(group);
  }

  async getGroupStatistics(id: number) {
    const group = await this.groupRepo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.endpoints', 'endpoints')
      .leftJoin('endpoints.accessLogs', 'logs')
      .where('group.id = :id', { id })
      .select([
        'group.id',
        'group.group_code',
        'COUNT(DISTINCT endpoints.id) as total_endpoints',
        'COUNT(logs.id) as total_requests',
        'AVG(CASE WHEN logs.response_status < 400 THEN 1 ELSE 0 END) * 100 as success_rate',
      ])
      .groupBy('group.id')
      .getRawOne();

    if (!group) {
      throw new NotFoundException(`API Group with ID ${id} not found`);
    }

    return group;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEndpointDto, UpdateEndpointDto } from '../dtos/api-endpoint.dto';
import { ApiEndpoint } from '../../../../../database/entities/api_endpoints.entity';
import { ApiGroup } from '../../../../../database/entities/api_groups.entity';

@Injectable()
export class ApiEndpointsService {
  constructor(
    @InjectRepository(ApiEndpoint)
    private endpointRepo: Repository<ApiEndpoint>,
    @InjectRepository(ApiGroup)
    private groupRepo: Repository<ApiGroup>,
  ) {}

  async create(createDto: CreateEndpointDto) {
    const group = await this.groupRepo.findOneBy({
      id: createDto.apiGroup as number,
    });

    if (!group) {
      throw new NotFoundException(
        `API Group with ID ${createDto.apiGroup} not found`,
      );
    }

    const endpoint = this.endpointRepo.create({
      endpoint_pattern: createDto.endpoint_pattern,
      method: createDto.method,
      description: createDto.description,
      path_params: createDto.path_params,
      query_params: createDto.query_params,
      apiGroup: group,
    });

    return this.endpointRepo.save(endpoint);
  }

  async findAll(options?: {
    groupId?: number;
    method?: string;
    search?: string;
  }) {
    const query = this.endpointRepo
      .createQueryBuilder('endpoint')
      .leftJoinAndSelect('endpoint.apiGroup', 'group');

    if (options?.groupId) {
      query.andWhere('group.id = :groupId', { groupId: options.groupId });
    }
    if (options?.method) {
      query.andWhere('endpoint.method = :method', { method: options.method });
    }
    if (options?.search) {
      query.andWhere('endpoint.endpoint_pattern LIKE :search', {
        search: `%${options.search}%`,
      });
    }

    return query
      .orderBy('group.group_code', 'ASC')
      .addOrderBy('endpoint.endpoint_pattern', 'ASC')
      .getMany();
  }

  async findOne(id: number) {
    const endpoint = await this.endpointRepo.findOne({
      where: { id },
      relations: ['apiGroup'],
    });

    if (!endpoint) {
      throw new NotFoundException(`API Endpoint with ID ${id} not found`);
    }

    return endpoint;
  }

  async update(id: number, updateDto: UpdateEndpointDto) {
    const endpoint = await this.findOne(id);

    if (updateDto.apiGroup) {
      const group = await this.groupRepo.findOneBy({
        id: updateDto.apiGroup as number,
      });

      if (!group) {
        throw new NotFoundException(
          `API Group with ID ${updateDto.apiGroup} not found`,
        );
      }

      endpoint.apiGroup = group;
    }

    // Create a new object without apiGroup for merging
    const { apiGroup, ...updateData } = updateDto;

    // Update other fields
    Object.assign(endpoint, updateData);

    return this.endpointRepo.save(endpoint);
  }

  async remove(id: number) {
    const endpoint = await this.findOne(id);
    return this.endpointRepo.remove(endpoint);
  }
}

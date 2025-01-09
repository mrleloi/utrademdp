import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '@modules/admin/modules/dashboard/dtos/api-user-permissions.dto';
import { ApiUserPermission } from '../../../../../database/entities/api_user_permissions.entity';
import { ApiEndpoint } from '../../../../../database/entities/api_endpoints.entity';

@Injectable()
export class ApiUserPermissionsService {
  constructor(
    @InjectRepository(ApiUserPermission)
    private permissionRepo: Repository<ApiUserPermission>,
  ) {}

  async create(createDto: CreatePermissionDto) {
    if (!createDto.apiGroup && !createDto.apiEndpoint) {
      throw new BadRequestException(
        'Either apiGroup or apiEndpoint must be provided',
      );
    }

    if (createDto.apiGroup && createDto.apiEndpoint) {
      throw new BadRequestException(
        'Cannot specify both apiGroup and apiEndpoint',
      );
    }

    // Check for existing permission
    const existingPermission = await this.permissionRepo.findOne({
      where: {
        apiUser: { id: createDto.apiUser.id },
        ...(createDto.apiGroup
          ? { apiGroup: { id: createDto.apiGroup.id } }
          : {}),
        ...(createDto.apiEndpoint
          ? { apiEndpoint: { id: createDto.apiEndpoint.id } }
          : {}),
      },
    });

    if (existingPermission) {
      throw new BadRequestException('Permission already exists');
    }

    const permission = this.permissionRepo.create(createDto);
    return this.permissionRepo.save(permission);
  }

  async findAll(options?: {
    userId?: number;
    groupId?: number;
    isActive?: boolean;
  }) {
    const query = this.permissionRepo
      .createQueryBuilder('permission')
      .leftJoinAndSelect('permission.apiUser', 'user')
      .leftJoinAndSelect('permission.apiGroup', 'group')
      .leftJoinAndSelect('permission.apiEndpoint', 'endpoint');

    if (options?.userId) {
      query.andWhere('user.id = :userId', { userId: options.userId });
    }
    if (options?.groupId) {
      query.andWhere('group.id = :groupId', { groupId: options.groupId });
    }
    if (typeof options?.isActive === 'boolean') {
      query.andWhere('permission.is_active = :isActive', {
        isActive: options.isActive,
      });
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepo.findOne({
      where: { id },
      relations: ['apiUser', 'apiGroup', 'apiEndpoint'],
    });

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return permission;
  }

  async update(id: number, updateDto: UpdatePermissionDto) {
    const permission = await this.findOne(id);
    Object.assign(permission, updateDto);
    return this.permissionRepo.save(permission);
  }

  async remove(id: number) {
    const permission = await this.findOne(id);
    return this.permissionRepo.remove(permission);
  }

  async findUserPermissions(userId: number) {
    return this.permissionRepo.find({
      where: {
        apiUser: { id: userId },
        is_active: true,
      },
      relations: ['apiGroup', 'apiEndpoint'],
    });
  }

  async checkPermission(
    userId: number,
    endpoint: ApiEndpoint,
    instruments?: Array<{ type: string; value: string }>,
  ) {
    // Find user's active permissions
    const permissions = await this.findUserPermissions(userId);

    // Check endpoint permissions
    const hasEndpointAccess = permissions.some((permission) => {
      // Direct endpoint permission
      if (permission.apiEndpoint?.id === endpoint.id) {
        return true;
      }
      // Group permission
      if (permission.apiGroup?.id === endpoint.apiGroup.id) {
        return true;
      }
      return false;
    });

    if (!hasEndpointAccess) {
      return false;
    }

    // If no instruments to check, permission is granted
    if (!instruments || instruments.length === 0) {
      return true;
    }

    // Check instrument permissions
    return instruments.every((instrument) => {
      return permissions.some((permission) => {
        const allowedInstruments = permission.allowed_instruments || [];
        return allowedInstruments.some((allowed) => {
          return (
            allowed.instrument_type === instrument.type &&
            (allowed.values.includes('*') ||
              allowed.values.includes(instrument.value))
          );
        });
      });
    });
  }

  async togglePermissionStatus(id: number) {
    const permission = await this.findOne(id);
    permission.is_active = !permission.is_active;
    return this.permissionRepo.save(permission);
  }
}

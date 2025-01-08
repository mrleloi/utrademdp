import { EntityManager, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PermissionLevel } from '@shared/constants';
import { ApiUserPermission } from '../../../database/entities/api_user_permissions.entity';
import { ApiEndpoint } from '../../../database/entities/api_endpoints.entity';
import { ApiUser } from '../../../database/entities/api_users.entity';

interface GroupedEndpoints {
  [groupId: string]: ApiEndpoint[];
}

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(ApiUser)
    private userRepository: Repository<ApiUser>,
    @InjectRepository(ApiEndpoint)
    private endpointRepo: Repository<ApiEndpoint>,
    @InjectRepository(ApiUserPermission)
    private permissionRepo: Repository<ApiUserPermission>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async createDefaultPermissions(user: ApiUser): Promise<void> {
    const endpoints = await this.endpointRepo.find({
      relations: ['apiGroup'],
    });

    const groupedEndpoints = endpoints.reduce<GroupedEndpoints>(
      (acc, endpoint) => {
        const groupId = endpoint.apiGroup.id.toString();
        if (!acc[groupId]) {
          acc[groupId] = [];
        }
        acc[groupId].push(endpoint);
        return acc;
      },
      {},
    );

    await this.entityManager.transaction(async (transactionalEntityManager) => {
      try {
        await Promise.all(
          Object.entries(groupedEndpoints).map(
            async ([groupId, groupEndpoints]) => {
              const groupPermission = this.permissionRepo.create({
                apiUser: user,
                permission_level: PermissionLevel.GROUP,
                apiGroup: { id: parseInt(groupId) },
                is_active: true,
                allowed_instruments: [], // Full access to all instruments
              });

              await transactionalEntityManager.save(groupPermission);

              const endpointPermissions = groupEndpoints.map((endpoint) =>
                this.permissionRepo.create({
                  apiUser: user,
                  permission_level: PermissionLevel.ENDPOINT,
                  apiEndpoint: endpoint,
                  apiGroup: endpoint.apiGroup,
                  is_active: true,
                  allowed_instruments: [], // Full access to all instruments
                }),
              );

              await transactionalEntityManager.save(endpointPermissions);
            },
          ),
        );
      } catch (error) {
        console.error('Failed to create default permissions:', error);
        throw new InternalServerErrorException(
          'Failed to create default permissions',
        );
      }
    });
  }

  async grantDefaultPermissionsToAllUsers(
    newEndpoint: ApiEndpoint,
  ): Promise<void> {
    const users = await this.userRepository.find();

    const permissions = users.map((user) =>
      this.permissionRepo.create({
        apiUser: user,
        permission_level: PermissionLevel.ENDPOINT, // Assuming default permissions are at the endpoint level
        apiEndpoint: newEndpoint,
        apiGroup: newEndpoint.apiGroup,
        is_active: true,
        allowed_instruments: [], // Specify any default instrument access rules
      }),
    );

    await this.entityManager.transaction(async (transactionalEntityManager) => {
      try {
        await transactionalEntityManager.save(permissions);
      } catch (error) {
        console.error(
          'Error granting default permissions to all users:',
          error,
        );
        throw new InternalServerErrorException(
          'Error granting default permissions to all users',
        );
      }
    });
  }
}

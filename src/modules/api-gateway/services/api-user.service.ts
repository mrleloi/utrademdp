import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiUser } from '../../../database/entities/api_users.entity';
import { ApiUserPermission } from '../../../database/entities/api_user_permissions.entity';
import { ApiEndpoint } from '../../../database/entities/api_endpoints.entity';
import { PermissionService } from '@modules/api-gateway/services/permission.service';

@Injectable()
export class ApiUserService {
  constructor(
    @InjectRepository(ApiUser)
    private apiUserRepo: Repository<ApiUser>,
    @InjectRepository(ApiUserPermission)
    private permissionRepo: Repository<ApiUserPermission>,
    @InjectRepository(ApiEndpoint)
    private endpointRepo: Repository<ApiEndpoint>,
    private permissionService: PermissionService,
  ) {}

  async findOrCreateUser(username: string): Promise<ApiUser> {
    let user = await this.apiUserRepo.findOne({
      where: { username },
      relations: ['permissions'],
    });

    if (!user) {
      user = await this.apiUserRepo.save({
        username,
        status: 'ACTIVE',
        created_at: new Date(),
        updated_at: new Date(),
      });

      await this.permissionService.createDefaultPermissions(user);
    }

    return user;
  }
}

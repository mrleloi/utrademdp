import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionLevel } from '@shared/constants';
import { ApiUserPermission } from '../../../database/entities/api_user_permissions.entity';
import { ApiEndpoint } from '../../../database/entities/api_endpoints.entity';
import { ApiUserService } from '@modules/api-gateway/services/api-user.service';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  constructor(
    private apiUserService: ApiUserService,
    @InjectRepository(ApiUserPermission)
    private permissionRepo: Repository<ApiUserPermission>,
    @InjectRepository(ApiEndpoint)
    private endpointRepo: Repository<ApiEndpoint>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (this.shouldSkipAuth(req)) {
      return next();
    }

    const username = req['user'];
    if (!username) {
      throw new UnauthorizedException();
    }

    // Extract group_id and clean path from request
    const { groupId, cleanPath } = this.extractPathInfo(req.path);
    if (!groupId) {
      throw new NotFoundException('API group not found');
    }

    // Ensure user exists in database
    const apiUser = await this.apiUserService.findOrCreateUser(username);

    const endpoint = await this.matchEndpoint(
      cleanPath,
      req.method,
      groupId
    );

    if (!endpoint) {
      console.log('No matching endpoint found for:', {
        path: cleanPath,
        method: req.method,
        groupId
      });
      throw new NotFoundException('Endpoint not found');
    }

    const instrumentParams = this.extractInstrumentParams(
      req,
      cleanPath,
      endpoint,
    );

    const hasPermission = await this.checkPermission(
      username,
      endpoint,
      instrumentParams,
    );

    if (!hasPermission) {
      throw new ForbiddenException();
    }

    req['apiUser'] = apiUser;
    req['endpoint'] = endpoint;
    req['instrumentParams'] = instrumentParams;
    next();
  }

  private async matchEndpoint(
    path: string,
    method: string,
    groupId: string,
  ): Promise<ApiEndpoint> {
    const endpoints = await this.endpointRepo.find({
      where: {
        method: method.toUpperCase(),
        apiGroup: { group_code: groupId },
      },
      relations: ['apiGroup'],
    });

    for (const endpoint of endpoints) {
      const regex = this.patternToRegex(endpoint.endpoint_pattern);
      if (regex.test(path)) {
        return endpoint;
      }
    }

    return null;
  }

  private extractPathInfo(fullPath: string): { groupId: string | null; cleanPath: string } {
    const pathMappings = {
      '/api-gateway/innodata': 'INNO_DATA',
      '/api-gateway/utrade-sg': 'UTRADE_SG',
      '/api-gateway/utrade-hk': 'UTRADE_HK',
      '/api-gateway/ufuture': 'UFUTURE',
    };

    for (const [prefix, groupId] of Object.entries(pathMappings)) {
      if (fullPath.startsWith(prefix)) {
        const cleanPath = fullPath.substring(prefix.length);
        return { groupId, cleanPath };
      }
    }

    return { groupId: null, cleanPath: fullPath };
  }

  private patternToRegex(pattern: string): RegExp {
    const escapedPattern = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\\\{/g, '{') // restore {
      .replace(/\\\}/g, '}'); // restore }

    const regexPattern = escapedPattern.replace(
      /{(\w+)}/g,
      (_, name) => `(?<${name}>[^/]+)`
    );

    return new RegExp(`^${regexPattern}$`);
  }

  private async checkPermission(
    username: string,
    endpoint: ApiEndpoint,
    instrumentParams: Record<string, string>,
  ): Promise<boolean> {
    const groupPermission = await this.permissionRepo.findOne({
      where: {
        apiUser: { username },
        permission_level: PermissionLevel.GROUP,
        apiGroup: { id: endpoint.apiGroup.id },
        is_active: true,
      },
    });

    if (!groupPermission) {
      return false;
    }

    const endpointPermission = await this.permissionRepo.findOne({
      where: {
        apiUser: { username },
        permission_level: PermissionLevel.ENDPOINT,
        apiEndpoint: { id: endpoint.id },
        is_active: true,
      },
    });

    if (endpointPermission) {
      return this.validateInstruments(endpointPermission, instrumentParams);
    }

    return false;
  }

  private validateInstruments(
    permission: ApiUserPermission,
    params: Record<string, string>,
  ): boolean {
    if (!permission.allowed_instruments?.length) {
      return true;
    }

    return Object.entries(params).every(([type, value]) => {
      const instrumentPermission = permission.allowed_instruments.find(
        (p) => p.instrument_type === type,
      );

      if (!instrumentPermission) return false;
      return instrumentPermission.values.includes(value);
    });
  }

  private extractInstrumentParams(
    req: Request,
    path: string,
    endpoint: ApiEndpoint,
  ): Record<string, string> {
    const params: Record<string, string> = {};

    // extract from path
    const { instrumentParams }: any = endpoint.path_params;
    if (!instrumentParams?.length) return params;

    const regexPattern = endpoint.endpoint_pattern
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape special characters
      .replace(/\\\{(\w+)\\\}/g, '(?<$1>[^/]+)'); // convert {param} to (?<param>[^/]+)

    const regex = new RegExp(`^${regexPattern}$`);
    const match = path.match(regex);

    if (match?.groups) {
      for (const paramName of instrumentParams) {
        if (match.groups[paramName]) {
          params[paramName] = match.groups[paramName];
        }
      }
    }

    // Extract from query and body
    ['ric', 'ticker', 'exchangeCode'].forEach((key) => {
      if (req.query[key]) {
        params[key] = req.query[key] as string;
      }
      if (req.body && req.body[key]) {
        params[key] = req.body[key];
      }
    });

    return params;
  }

  protected shouldSkipAuth(req: Request): boolean {
    return req.path.includes('/auth/token');
  }
}

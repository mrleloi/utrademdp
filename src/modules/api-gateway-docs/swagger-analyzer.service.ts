import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiGroup } from '../../database/entities/api_groups.entity';
import { ApiEndpoint } from '../../database/entities/api_endpoints.entity';
import { API_IDS } from '@shared/constants';
import { PermissionService } from '@modules/api-gateway/services/permission.service';

interface Parameter {
  name: string;
  in: string;
  schema?: {
    type: string;
    enum?: string[];
  };
  required?: boolean;
}

@Injectable()
export class SwaggerAnalyzerService {
  private readonly INSTRUMENT_PARAM_TYPES = ['ric', 'ticker', 'exchangeCode'];

  constructor(
    @InjectRepository(ApiGroup)
    private apiGroupRepo: Repository<ApiGroup>,
    @InjectRepository(ApiEndpoint)
    private apiEndpointRepo: Repository<ApiEndpoint>,
    private permissionService: PermissionService,
  ) {}

  async analyzeAndSaveApiSpec(spec: any, apiGroupId: keyof typeof API_IDS) {
    // return true;
    // Ensure API group exists
    let apiGroup = await this.apiGroupRepo.findOne({
      where: { group_code: apiGroupId },
    });

    if (!apiGroup) {
      apiGroup = await this.apiGroupRepo.save({
        group_code: apiGroupId,
        description: `${apiGroupId} API Group`,
      });
    }

    // Analyze and save each path
    for (const [path, pathItem] of Object.entries<any>(spec.paths)) {
      for (const [method, operation] of Object.entries<any>(pathItem)) {
        // Skip non-HTTP methods
        if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
          continue;
        }

        const parameters = [
          ...(pathItem.parameters || []).filter((p) => p.in === 'path'), // Always include path parameters
          ...(method === 'get'
            ? operation.parameters.filter(
                (p) => p.in === 'path' || p.in === 'query',
              )
            : []), // For GET, only include query parameters
          ...this.extractBodyParameters(operation, method), // For POST, PUT, PATCH include body parameters
        ];

        const { endpointPattern, instrumentParams, otherParams } =
          this.analyzeEndpoint(path, parameters);

        await this.saveEndpoint(
          apiGroup.id,
          method.toUpperCase(),
          endpointPattern,
          instrumentParams,
          otherParams,
          operation.description || '',
        );
      }
    }
  }

  private analyzeEndpoint(path: string, parameters: Parameter[]) {
    const instrumentParams: string[] = [];
    const otherParams: string[] = [];
    const endpointPattern = path;

    parameters.forEach((param) => {
      if (this.INSTRUMENT_PARAM_TYPES.includes(param.name)) {
        instrumentParams.push(param.name);
      } else {
        otherParams.push(param.name);
      }
    });

    return { endpointPattern, instrumentParams, otherParams };
  }

  private extractBodyParameters(operation: any, method: string): Parameter[] {
    if (
      ['post', 'put', 'patch'].includes(method.toLowerCase()) &&
      operation.requestBody
    ) {
      const content = operation.requestBody.content?.['application/json'];
      if (content && content.schema && content.schema.properties) {
        return Object.keys(content.schema.properties).map((name) => ({
          name,
          in: 'body',
          schema: content.schema.properties[name],
        }));
      }
    }
    return [];
  }

  private isInstrumentParam(param: Parameter): boolean {
    if (this.INSTRUMENT_PARAM_TYPES.includes(param.name.toLowerCase())) {
      return true;
    }
    if (
      param.schema?.type === 'string' &&
      param.name.toLowerCase().includes('symbol')
    ) {
      return true;
    }
    return false;
  }

  private async saveEndpoint(
    groupId: number,
    method: string,
    pattern: string,
    instrumentParams: string[],
    otherParams: string[],
    description: string,
  ) {
    const existing = await this.apiEndpointRepo.findOne({
      where: {
        apiGroup: { id: groupId },
        method,
        endpoint_pattern: pattern,
      },
    });

    if (existing) {
      await this.apiEndpointRepo.update(existing.id, {
        path_params: { instrumentParams, otherParams },
        description,
      });
    } else {
      const newEndpoint = await this.apiEndpointRepo.save({
        apiGroup: { id: groupId },
        method,
        endpoint_pattern: pattern,
        path_params: { instrumentParams, otherParams },
        description,
      });

      // Auto-grant permissions to all users
      await this.permissionService.grantDefaultPermissionsToAllUsers(
        newEndpoint,
      );
    }
  }
}

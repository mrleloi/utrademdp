import { PermissionLevel } from '@shared/constants';
import { ApiUser } from '../../../../../database/entities/api_users.entity';
import { ApiGroup } from '../../../../../database/entities/api_groups.entity';
import { ApiEndpoint } from '../../../../../database/entities/api_endpoints.entity';

export class CreatePermissionDto {
  apiUser: ApiUser;
  permission_level: PermissionLevel;
  apiGroup?: ApiGroup;
  apiEndpoint?: ApiEndpoint;
  allowed_instruments?: {
    instrument_type: string;
    values: string[];
  }[];
  is_active: boolean;
}

export class UpdatePermissionDto {
  permission_level?: PermissionLevel;
  allowed_instruments?: {
    instrument_type: string;
    values: string[];
  }[];
  is_active?: boolean;
}

export class ApiUserPermissionResponseDto {
  id: number;
  apiUser: {
    id: number;
    username: string;
  };
  permission_level: PermissionLevel;
  apiGroup?: {
    id: number;
    group_code: string;
  };
  apiEndpoint?: {
    id: number;
    endpoint_pattern: string;
  };
  allowed_instruments: {
    instrument_type: string;
    values: string[];
  }[];
  is_active: boolean;
}

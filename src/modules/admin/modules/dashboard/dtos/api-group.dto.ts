import { EndpointResponseDto } from '@modules/admin/modules/dashboard/dtos/api-endpoint.dto';

export class CreateGroupDto {
  group_code: string;
  description: string;
}

export class UpdateGroupDto {
  description: string;
}

export class GroupResponseDto {
  id: number;
  group_code: string;
  description: string;
  created_at: Date;
  endpoints?: EndpointResponseDto[];
}

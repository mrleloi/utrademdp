import { ApiProperty } from '@nestjs/swagger';
import { AccessLogResponseDto } from '@modules/admin/modules/dashboard/dtos/api-access-log.dto';

export class CreateApiUserDto {
  username: string;
  status: string;
}

export class UpdateApiUserDto {
  status: string;
}

export class ApiUserResponseDto {
  id: number;
  username: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export class ApiUserDetailDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  stats: {
    total_requests: number;
    success_rate: number;
    last_access: Date;
    most_used_endpoints: {
      endpoint: string;
      count: number;
    }[];
    most_used_instruments: {
      type: string;
      value: string;
      count: number;
    }[];
  };
}
export class ApiUserStatisticsDto {
  @ApiProperty()
  access: {
    total_requests: number;
    success_rate: number;
    last_access: Date;
  };

  @ApiProperty()
  topEndpoints: {
    endpoint: string;
    count: number;
    success_rate: number;
  }[];

  @ApiProperty()
  instrumentUsage: {
    type: string;
    total_usage: number;
    unique_values: number;
  }[];
}

export class ApiUserAccessHistoryResponseDto {
  @ApiProperty({ type: [AccessLogResponseDto] })
  items: AccessLogResponseDto[];

  @ApiProperty()
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

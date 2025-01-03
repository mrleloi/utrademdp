import { ApiProperty } from '@nestjs/swagger';

export class ConfigurationResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 300 })
  interval_seconds: number;

  @ApiProperty({ example: 15 })
  duration_minutes: number;
}

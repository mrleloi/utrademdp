import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DeviceTypes } from 'src/shared/enums/app.enums';

export class GetTrustAccountsDto {
  @ApiProperty({
    type: String,
    example: 'L220289830',
    description: 'ID',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    example: 'L1',
    description: 'Type',
    required: true,
  })
  @IsString()
  type: string;

  @ApiProperty({
    enum: DeviceTypes,
    example: DeviceTypes.Android,
    description: 'Device type',
    required: false,
  })
  @IsString()
  src: DeviceTypes;

  @ApiProperty({
    type: String,
    example: '00.00.00.00',
    description: 'Customer IP',
    required: true,
  })
  @IsString()
  ip: string;

  @ApiProperty({
    type: String,
    example: '00.00.00.00',
    description: 'Customer IP',
    required: true,
  })
  @IsString()
  srcServerIP: string;

  @ApiProperty({
    type: String,
    example:
      'eyJlbXBJRCI6IjAwMDYzODkiLCJjdXN0SUQiOiJGMjIwNzE5MjQwIiwiZnVuQ29kZSI6IlMwMiIsImJyYW5Db2RlIjoiIiwicm9sZUNvABCiOiIifQ==',
    description: 'Trust sequence',
    required: true,
  })
  @IsString()
  trustSeq: string;
}

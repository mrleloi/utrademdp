import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '1a2b3c4d5e6f7g8h9i0j',
    required: true,
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  user_name: string;

  @ApiProperty({
    description: 'Phone number',
    example: '00-1234567-1234',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_phone: string;

  @ApiProperty({
    description: 'User email',
    example: '00-1234567-1234',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_email: string;

  @ApiProperty({
    description: 'User address',
    example: 'HongKong',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_address: string;

  @ApiProperty({
    description: 'Company industry of the user',
    example: 'IT',
    required: true,
  })
  @IsString()
  user_company_industry?: string;

  @ApiProperty({
    description: 'Comany name',
    example: 'LabCI',
    required: true,
  })
  @IsOptional()
  @IsString()
  user_company_name?: string;

  @ApiProperty({
    description: "User's comany address",
    example: 'New York',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_company_address?: string;

  @ApiProperty({
    description: 'Indicates if the user accepts terms and conditions',
    example: true,
  })
  @IsBoolean()
  user_accept_tc: boolean;
}

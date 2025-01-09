import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class ProfileResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  last_login: Date;

  @ApiProperty({ type: [RoleDto] })
  roles: RoleDto[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

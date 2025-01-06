export class TokenRequestDto {
  @ApiProperty()
  @IsString()
  token: string;
}
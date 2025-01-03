import { ApiProperty } from '@nestjs/swagger';

export class AccountInfo {
  @ApiProperty({ example: ['9218-2300245'] })
  STK: string[];

  @ApiProperty({ example: ['000-9812767', '009-0096596'] })
  FUT: string[];

  @ApiProperty({ example: ['20001277607'] })
  OSB: string[];

  @ApiProperty({ example: ['9268-9268123456789'] })
  WM: string[];
}

export class TrustInfo {
  @ApiProperty({ example: 'S202539557' })
  ID: string;

  @ApiProperty({ example: '王ＯＯ' })
  Name: string;

  @ApiProperty()
  Accounts: AccountInfo;
}

export class GetTrustAccountsResponse {
  @ApiProperty({ example: '0' })
  StatusCode: string;

  @ApiProperty({ example: '0' })
  RtnMessage: string;

  @ApiProperty({ type: [TrustInfo] })
  TrustInfo: TrustInfo[];
}

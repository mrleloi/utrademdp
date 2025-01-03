import { ApiProperty } from '@nestjs/swagger';

export class GetPurchasingPowerResponse {
  @ApiProperty({ example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ example: 'USD' })
  CURRENCY: string;

  @ApiProperty({ example: '300' })
  PP1: string;

  @ApiProperty({ example: '0' })
  PP2: string;

  @ApiProperty({ example: '400' })
  PP3: string;

  @ApiProperty({ example: '400' })
  PP4: string;

  @ApiProperty({ example: '400' })
  PP3_DEBT: string;

  @ApiProperty({ example: '300' })
  PP5: string;

  @ApiProperty({ example: '100' })
  PP6_TWD: string;

  @ApiProperty({ example: '0' })
  PP7_TWD: string;

  @ApiProperty({ example: '0' })
  PP8_TWD: string;

  @ApiProperty({ example: '0' })
  INUSE_BANK0BONDTWD: string;

  @ApiProperty({ example: '0' })
  INUSE_BANK1TWD: string;

  @ApiProperty({ example: '0' })
  BALANCE_TWD: string;

  @ApiProperty({ example: '0' })
  BALANCE_DEBTTWD: string;

  @ApiProperty({ example: '0' })
  AMOUNT: string;

  @ApiProperty({ example: '' })
  BANK_ACC_TWD: string;

  @ApiProperty({ example: '' })
  BALANCE_TWD_TWD: string;

  @ApiProperty({ example: '' })
  BALANCE_DEBTTWD_TWD: string;
}

export class GetBankBalanceInquiryResponse {
  @ApiProperty({ example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ example: 500000 })
  AMOUNT: number;

  @ApiProperty({ example: '00027150172966' })
  BANK_ACC_TWD: string;

  @ApiProperty({ example: '8090119' })
  BANK_ID: string;
}

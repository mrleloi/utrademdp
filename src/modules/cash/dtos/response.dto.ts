import { ApiProperty } from '@nestjs/swagger';
import { OrderChannels } from 'src/shared/enums/app.enums';

export class CashResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '2022/10/27' })
  APPLY_DATE: string;

  @ApiProperty({ type: String, example: 'HKD' })
  CURRENCY: string;

  @ApiProperty({ type: Number, example: 2461 })
  TODAY_DROW: number;

  @ApiProperty({ type: Number, example: 0 })
  TODAY_DEPOSIT: number;

  @ApiProperty({ type: Number, example: 0.41 })
  TRANS: number;

  @ApiProperty({ type: String, example: '外幣自有帳戶' })
  BANK: string;

  @ApiProperty({ type: String, example: '一般' })
  ACTION_TYPE: string;
}

export class DeleteCashResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '2022/10/27' })
  APPLY_DATE: string;

  @ApiProperty({ type: String, example: 'HKD' })
  CURRENCY: string;

  @ApiProperty({ type: String, example: '' })
  AMOUNT: string;

  @ApiProperty({ type: String, example: '' })
  CHANNEL: string;

  @ApiProperty({ type: Number, example: 2461 })
  TODAY_DROW: number;

  @ApiProperty({ type: Number, example: 0 })
  TODAY_DEPOSIT: number;

  @ApiProperty({ type: Number, example: 0.41 })
  TRANS: number;

  @ApiProperty({ type: String, example: '外幣自有帳戶' })
  BANK: string;

  @ApiProperty({ type: String, example: '一般' })
  ACTION_TYPE: string;
}

export class CashReportResponse {
  @ApiProperty({ type: String, example: '台北分公司' })
  BRANCH_NAME: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '2022/10/27' })
  APPLY_DATE: string;

  @ApiProperty({ type: String, example: 'HKD' })
  CURRENCY: string;

  @ApiProperty({ type: Number, example: 2461 })
  AMOUNT: number;

  @ApiProperty({ type: String, example: OrderChannels.RU })
  CHANNEL: string;
}

export class UnholdAMountResponse {
  @ApiProperty({ type: String, example: '台北分公司' })
  BRANCH_NAME: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '2022/10/27' })
  APPLY_DATE: string;

  @ApiProperty({ type: String, example: 'HKD' })
  CURRENCY: string;

  @ApiProperty({ type: Number, example: 2461 })
  AMOUNT: number;
}

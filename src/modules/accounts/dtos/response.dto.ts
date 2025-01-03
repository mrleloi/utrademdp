import { ApiProperty } from '@nestjs/swagger';
import { SettleCurrency, TradeTypes } from 'src/shared/enums/app.enums';

export class GetStatementResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '2021/10/10' })
  TRADE_DATE: string;

  @ApiProperty({ enum: TradeTypes, example: TradeTypes.Sell })
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({
    enum: SettleCurrency,
    example: SettleCurrency.ForeignCurrency,
  })
  SETTLE_CURRENCY: SettleCurrency;

  @ApiProperty({ type: Number, example: 107.3 })
  SETTLE_AMT: number;

  @ApiProperty({ type: String, example: 'USD' })
  TRADE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 140.3 })
  PRICE: number;

  @ApiProperty({ type: Number, example: 0.71275 })
  QTY: number;

  @ApiProperty({ type: Number, example: 1005 })
  AMOUNT: number;

  @ApiProperty({ type: Number, example: 7 })
  COMM: number;

  @ApiProperty({ type: Number, example: 0 })
  CUSTODY: number;

  @ApiProperty({ type: Number, example: 0 })
  TRADE_LEVY: number;

  @ApiProperty({ type: Number, example: 0 })
  STAMP_DUTY: number;

  @ApiProperty({ type: Number, example: 0 })
  OTHR_CHARGE: number;

  @ApiProperty({ type: Number, example: 0 })
  TRANS_FEE: number;

  @ApiProperty({ type: String, example: '定期定額買入' })
  NOTES: string;

  @ApiProperty({ type: String, example: '2021/10/12' })
  SETTLE_DATE: string;

  @ApiProperty({ type: String, example: '4' })
  QUERY_TYPE: string;
}

export class GetAccountInfoResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '北市中山區明水路700號' })
  ADDRESS: string;

  @ApiProperty({ type: String, example: '' })
  AUTH_NAME: string;

  @ApiProperty({ type: String, example: '桃園分公司 桃園成功' })
  BRANCH: string;

  @ApiProperty({ type: String, example: '林ＯＯ' })
  SALES: string;

  @ApiProperty({ type: String, example: '翁ＯＯ' })
  G_SALES: string;

  @ApiProperty({ type: String, example: 'TSIB TPE' })
  BANK_NAME: string;

  @ApiProperty({ type: String, example: '006719102772' })
  BANK_ACCOUNT: string;

  @ApiProperty({ type: String, example: '006756062778' })
  BANK_ACCOUNT2: string;

  @ApiProperty({ type: String, example: 'N/A' })
  BANK_NAME_TWD: string;

  @ApiProperty({ type: String, example: '20061100184612' })
  BANK_ACCOUNT_TWD: string;

  @ApiProperty({ type: String, example: '2013/01/17' })
  OPENDATE: string;

  @ApiProperty({ type: String, example: '1test@kgi.com.tw' })
  ESTATEMENT: string;

  @ApiProperty({ type: String, example: '' })
  E_MAIL: string;

  @ApiProperty({ type: Number, example: 1 })
  CUSTOMER_TYPE: number;

  @ApiProperty({ type: String, example: 'Y' })
  W8_FORM: string;

  @ApiProperty({ type: String, example: 'Y' })
  ETRADE: string;

  @ApiProperty({ type: Number, example: 9999999999 })
  ETRADE_PWDNO: number;

  @ApiProperty({ type: String, example: '2013/01/17' })
  ETRADE_APPLYDATE: string;

  @ApiProperty({ type: String, example: '1900/01/01' })
  ETRADE_CANCELDATE: string;

  @ApiProperty({ type: String, example: '1900/01/01' })
  ETRADE_PWDDATE: string;

  @ApiProperty({ type: String, example: '000' })
  BRANCH_CODE: string;

  @ApiProperty({ type: String, example: 'E121647731' })
  ID: string;

  @ApiProperty({ type: String, example: '2016/05/27' })
  W8W9_DATE: string;

  @ApiProperty({ type: String, example: 'N' })
  W9: string;

  @ApiProperty({ type: String, example: '穩健積極型' })
  RISK_LEVEL: string;

  @ApiProperty({ type: String, example: '2013/01/17' })
  RISK_LEVEL_DATE: string;

  @ApiProperty({ type: String, example: 'A' })
  PI_STATUS: string;

  @ApiProperty({ type: String, example: 'N' })
  HYDEBTFUND_RISK: string;

  @ApiProperty({ type: String, example: '1900/01/01' })
  HYDEBTFUND_RISK_DATE: string;

  @ApiProperty({ type: String, example: 'D' })
  ACCT_TYPE: string;

  @ApiProperty({ type: String, example: '' })
  PRE_ESTATEMENT: string;

  @ApiProperty({ type: String, example: '' })
  BANK_ACC_SIN: string;

  @ApiProperty({ type: String, example: '' })
  BANK_ID_SIN: string;

  @ApiProperty({ type: String, example: '' })
  SINGLE_APPLY: string;

  @ApiProperty({ type: String, example: '' })
  SINGLE_APPLY_DATE: string;

  @ApiProperty({ type: String, example: '' })
  KGI_ACCOUNT: string;

  @ApiProperty({ type: String, example: '' })
  DOCUMENT_STATUS: string;
  x;
  @ApiProperty({ type: String, example: '' })
  SIGNING_DATE: string;

  @ApiProperty({ type: String, example: '' })
  DOCUMENT_TYPE1_DATE: string;

  @ApiProperty({ type: String, example: 'N' })
  R_EQUITY_AGREEMENT: string;

  @ApiProperty({ type: String, example: '' })
  R_EQUITY_AGREEMENT_DATE: string;

  @ApiProperty({ type: String, example: 'N' })
  PD_TRANSFER_AGREEMENT: string;

  @ApiProperty({ type: String, example: '' })
  PD_SIGNING_DATE: string;

  @ApiProperty({ type: String, example: '1' })
  QI_NATIONALITY: string;

  @ApiProperty({ type: String, example: 'Y' })
  SETTLE_TWD: string;

  @ApiProperty({ type: String, example: '' })
  TDCC_ACCOUNT: string;

  @ApiProperty({ type: String, example: '' })
  W_FLAG: string;
}

export class GetAccountOverviewResponse {
  @ApiProperty({ type: Number, example: 44180.187548999995 })
  totalMarketCap: number;

  @ApiProperty({ type: Number, example: 1669.7283198500015 })
  totalProfits: number;

  @ApiProperty({ type: Number, example: 3.9048039163807404 })
  totalReturnRate: number;
}

export class GetTabRecordResponse {
  @ApiProperty({ type: Number, example: 3 })
  inventories: number;
  @ApiProperty({ type: Number, example: 3 })
  orders: number;
  @ApiProperty({ type: Number, example: 3 })
  trades: number;
}

export class GetNonTradingResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: '2021/10/10' })
  TRADE_DATE: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  TRADE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 0.71275 })
  QTY: number;

  @ApiProperty({ type: Number, example: 1005 })
  AMOUNT: number;

  @ApiProperty({ type: String, example: '定期定額買入' })
  NOTES: string;

  @ApiProperty({ type: String, example: '2021/10/12' })
  SETTLE_DATE: string;

  @ApiProperty({ type: String, example: '股票撥入' })
  TRANS_TYPE: string;

  @ApiProperty({
    type: String,
    example: ' Transfer from a/c Name:KGI Securities Co., Ltd, trust account',
  })
  DESCRIPTION: string;

  @ApiProperty({ type: String, example: '4' })
  QUERY_TYPE: string;

  @ApiProperty({ type: String, example: '' })
  STOCK_CLASS: string;
}

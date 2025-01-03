import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { TradeKind, TradeTypes } from 'src/shared/enums/app.enums';

export class InventoryDto {
  @ApiProperty({ type: String, example: '20001365441' })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  @IsString()
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: 'EQTY' })
  @IsString()
  PROD_TYPE: string;

  @ApiProperty({ type: String, example: 'US' })
  @IsString()
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  @IsString()
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  @IsString()
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  @IsString()
  CURRENCY: string;

  @ApiProperty({ type: String, example: 'MUT' })
  @IsString()
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  @IsNumber()
  QTY: number;

  @ApiProperty({ type: Number, example: 148.21 })
  @IsNumber()
  MARKET_PRICE: number;

  @ApiProperty({ type: String, example: '2021/10/12 00:00:00' })
  @IsString()
  CLOSE_DATE: string;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  BUYQTY: number;

  @ApiProperty({ type: Number, example: 129.315 })
  @IsNumber()
  UNIT_COST: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  LOSS_PROFIT: number;

  @ApiProperty({ type: Number, example: 440.34 })
  @IsNumber()
  COST_AMOUNT: any;

  @ApiProperty({ type: Number, example: 493.9 })
  @IsNumber()
  MARKET_PRICE_AMOUNT: number;

  @ApiProperty({ type: String, example: '4' })
  @IsString()
  TRADE_KIND: string;

  @ApiProperty({ type: Number, example: 98 })
  @IsNumber()
  REMNNERATION: number;

  @ApiProperty({ type: Number, example: 1606.5 })
  @IsNumber()
  LOSS_PROFIT_TWD: number;

  @ApiProperty({ type: Number, example: 1600.5 })
  @IsNumber()
  TRDPRC_1: number;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  BR_FUND_CODE: string;

  @ApiProperty({ type: String, example: '2024/08/20 10:10:10' })
  @IsString()
  COST_PRICE_TIME: string;

  @ApiProperty({ type: String, example: 'N' })
  @IsString()
  IS_BLOOMBERGCA: string;
}

export class RealizedDto {
  @ApiProperty({ type: String, example: '2021/10/06' })
  @IsString()
  TRADE_DATE: string;

  @ApiProperty({ type: String, example: '20001365441' })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: 'SELL' })
  @IsString()
  BUYSELL: string;

  @ApiProperty({ type: String, example: 'US' })
  @IsString()
  MARKET: string;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  EXE_QTY: number;

  @ApiProperty({ type: Number, example: 160 })
  @IsNumber()
  EXE_PRICE: number;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  RANSOM_SEQNO: string;

  @ApiProperty({ type: String, example: 'USD' })
  @IsString()
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: String, example: 'AAPL.O APPLE INC 蘋果公司- USD' })
  @IsString()
  DESCRIPTION: string;

  @ApiProperty({ type: Number, example: 1560.06 })
  @IsNumber()
  RANSOM_AMOUNT: number;

  @ApiProperty({ type: Number, example: 1560.06 })
  @IsNumber()
  UNIT_COST: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  PROFIT: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  PROFIT_RATE: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  LOSS_PROFIT_TWD: number;

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}

export class RealizedDetailDto {
  @ApiProperty({ type: String, example: '2021/10/06' })
  @IsString()
  TRADE_DATE: string;

  @ApiProperty({ type: String, example: '20001365441' })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: 'AAPL.O APPLE INC 蘋果公司-USD' })
  @IsString()
  DESCRIPTION: string;

  @ApiProperty({ type: String, example: 'SELL' })
  @IsString()
  RANSOM_TYPE: string;

  @ApiProperty({ type: String, example: '2022/11/25' })
  @IsString()
  RANSOM_TRADE_DATE: string;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  RANSOM_EXE_QTY: number;

  @ApiProperty({ type: Number, example: 160 })
  @IsNumber()
  RANSOM_EXE_PRICE: number;

  @ApiProperty({ type: Number, example: 1600 })
  @IsNumber()
  RANSOM_AMOUNT: number;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  RANSOM_NOTE: string;

  @ApiProperty({ type: String, example: 'BUY' })
  @IsString()
  COST_TYPE: string;

  @ApiProperty({ type: String, example: '2022/11/23' })
  @IsString()
  COST_TRADE_DATE: string;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  COST_EXE_QTY: number;

  @ApiProperty({ type: Number, example: 160 })
  @IsNumber()
  COST_EXE_PRICE: number;

  @ApiProperty({ type: Number, example: 1600 })
  @IsNumber()
  COST_AMOUNT: number;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  COST_NOTE: string;
}

export class UnrealizedDto {
  @ApiProperty({ type: String, example: '20001365441' })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  @IsString()
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: 'US' })
  @IsString()
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  @IsString()
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  @IsString()
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  @IsString()
  CURRENCY: string;

  @ApiProperty({ type: String, example: 'MUT' })
  @IsString()
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  @IsNumber()
  QTY: number;

  @ApiProperty({ type: Number, example: 148.21 })
  @IsNumber()
  MARKET_PRICE: number;

  @ApiProperty({ type: String, example: '2021/10/12 00:00:00' })
  @IsString()
  CLOSE_DATE: string;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  BUYQTY: number;

  @ApiProperty({ type: Number, example: 129.315 })
  @IsNumber()
  UNIT_COST: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  LOSS_PROFIT: number;

  @ApiProperty({ type: Number, example: 440.34 })
  @IsNumber()
  COST_AMOUNT: any;

  @ApiProperty({ type: Number, example: 493.9 })
  @IsNumber()
  MARKET_PRICE_AMOUNT: number;

  @ApiProperty({ type: String, example: '4' })
  @IsString()
  TRADE_KIND: string;

  @ApiProperty({ type: Number, example: 98 })
  @IsNumber()
  REMNNERATION: number;

  @ApiProperty({ type: Number, example: 1606.5 })
  @IsNumber()
  LOSS_PROFIT_TWD: number;

  @ApiProperty({ type: Number, example: 1600.5 })
  @IsNumber()
  TRDPRC_1: number;

  @ApiProperty({ type: Number, example: 100.5 })
  @IsNumber()
  CURRENT_LOST_PORFIT: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  CURRENT_PROFIT_RATE: number;
}

export class GetInventoryResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: 'US' })
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  CURRENCY: string;

  @ApiProperty({ type: String, example: 'MUT' })
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  QTY: number;

  @ApiProperty({ type: Number, example: 148.21 })
  MARKET_PRICE: number;

  @ApiProperty({ type: String, example: '2021/10/12 00:00:00' })
  CLOSE_DATE: string;

  @ApiProperty({ type: Number, example: 0 })
  BUYQTY: number;

  @ApiProperty({ type: Number, example: 129.315 })
  UNIT_COST: number;

  @ApiProperty({ type: Number, example: 53.55 })
  LOSS_PROFIT: number;

  @ApiProperty({ type: Number, example: 440.34 })
  COST_AMOUNT: number;

  @ApiProperty({ type: Number, example: 493.9 })
  MARKET_PRICE_AMOUNT: number;

  @ApiProperty({ type: String, example: '4' })
  TRADE_KIND: string;

  @ApiProperty({ type: Number, example: 98 })
  REMNNERATION: number;

  @ApiProperty({ type: Number, example: 1600.5 })
  @IsNumber()
  TRDPRC_1: number;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  BR_FUND_CODE: string;

  @ApiProperty({ type: String, example: '2024/08/20 10:10:10' })
  @IsString()
  COST_PRICE_TIME: string;

  @ApiProperty({ type: String, example: 'N' })
  @IsString()
  IS_BLOOMBERGCA: string;
}

export class GetUsPositionDetail {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: 'EQTY' })
  PROD_TYPE: string;

  @ApiProperty({ enum: TradeTypes, example: TradeTypes.Sell })
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ type: String, example: 'US' })
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  CURRENCY: string;

  @ApiProperty({ type: String, example: 'MUT' })
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  QTY: number;

  @ApiProperty({ type: Number, example: 148.21 })
  MARKET_PRICE: number;

  @ApiProperty({ type: String, example: '2021/10/12 00:00:00' })
  CLOSE_DATE: string;

  @ApiProperty({ type: Number, example: 129.315 })
  UNIT_COST: number;

  @ApiProperty({ type: Number, example: 440.34 })
  COST_AMOUNT: number;

  @ApiProperty({ type: String, example: '4' })
  TRADE_KIND: string;

  @ApiProperty({ type: String, example: '2021/10/12' })
  TRANS_DATE: string;
}

export class GetRealizedResponse {
  @ApiProperty({ type: Number, example: 1600 })
  @IsNumber()
  totalMarketCap: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  totalProfits: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  totalPurchaseAmount: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  totalReturnRate: number;

  @ApiProperty({ type: [RealizedDto] })
  @IsNumber()
  datas: RealizedDto[];
}

export class GetUnrealizedResponse {
  @ApiProperty({ type: Number, example: 43747.3856808 })
  @IsNumber()
  totalMarketCap: number;

  @ApiProperty({ type: Number, example: 1236.9264516499986 })
  @IsNumber()
  totalProfits: number;

  @ApiProperty({ type: Number, example: 42519.869999999995 })
  @IsNumber()
  totalCost: number;

  @ApiProperty({ type: Number, example: 2.8869224689539337 })
  @IsNumber()
  totalReturnRate: number;

  @ApiProperty({ type: [UnrealizedDto] })
  @IsNumber()
  datas: UnrealizedDto[];
}

export class GetDailyTradeOverviewResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  @IsString()
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: 'US' })
  @IsString()
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  @IsString()
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  @IsString()
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'MUT' })
  @IsString()
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  @IsNumber()
  QTY: number;

  @ApiProperty({ type: String, example: '2021/10/12 00:00:00' })
  @IsString()
  CLOSE_DATE: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  LOSS_PROFIT: number;

  @ApiProperty({ type: Number, example: 440.34 })
  @IsNumber()
  COST_AMOUNT: any;

  @ApiProperty({ type: Number, example: 493.9 })
  @IsNumber()
  MARKET_PRICE_AMOUNT: number;

  @ApiProperty({ type: String, example: '4' })
  @IsString()
  TRADE_KIND: string;

  @ApiProperty({ type: Number, example: 98 })
  @IsNumber()
  REMNNERATION: number;

  @ApiProperty({ type: Number, example: 1606.5 })
  @IsNumber()
  LOSS_PROFIT_TWD: number;

  @ApiProperty({ type: String, example: 'ASC22026395' })
  @IsString()
  TRANSACTION_REF: string;

  @ApiProperty({ type: String, example: '2021/10/12' })
  @IsString()
  TRANS_DATE: string;
}

export class GetDailyTradeOverviewDetailResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  @IsString()
  CUSTOMER_NAME: string;

  @ApiProperty({ type: String, example: 'B' })
  @IsString()
  TRADE_TYPE: string;

  @ApiProperty({ type: String, example: 'US' })
  @IsString()
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  @IsString()
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  @IsString()
  SYMBOL_NAME: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  @IsNumber()
  QTY: number;

  @ApiProperty({ type: String, example: '2021/10/12 00:00:00' })
  @IsString()
  CLOSE_DATE: string;

  @ApiProperty({ type: Number, example: 440.34 })
  @IsNumber()
  COST_AMOUNT: number;

  @ApiProperty({ type: Number, example: 493.9 })
  @IsNumber()
  MARKET_PRICE_AMOUNT: number;

  @ApiProperty({ type: String, example: '4' })
  @IsString()
  TRADE_KIND: string;

  @ApiProperty({ type: String, example: 'ASC22026395' })
  @IsString()
  TRANSACTION_REF: string;
}

export class GetDailyPnLResponse {
  @ApiProperty({ type: Number, example: 1600 })
  totalProfits: number;

  @ApiProperty({ type: Number, example: 10 })
  totalProfitRate: number;

  @ApiProperty({ type: Number, example: 16000 })
  totalProfitsTWD: number;

  @ApiProperty({ type: [GetDailyTradeOverviewResponse] })
  datas: GetDailyTradeOverviewResponse[];
}

export class GetDailyExchangeRateResponse {
  @ApiProperty({ type: String, example: 'USD' })
  SETTLE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 28.75 })
  EX_RATE: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  ExecuteStatusCode,
  LongTermOrderStatus,
  OrderMethods,
  SettleCurrency,
  TradeTypes,
} from 'src/shared/enums/app.enums';

export class GetLongTermOrderResponse {
  @ApiProperty({ type: String, example: '2016/08/29 13:06:50' })
  CREATE_TIME: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ enum: TradeTypes, example: TradeTypes.Sell })
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ type: String, example: 'US' })
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  TRADE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 10.11111 })
  PRICE: number;

  @ApiProperty({ type: Number, example: 3.33241 })
  QTY: number;

  @ApiProperty({ type: String, example: '0' })
  SALES_STATUS_CODE: string;

  @ApiProperty({ type: String, example: 'USD' })
  SALES_STATUS: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  EXE_QTY: number;

  @ApiProperty({ enum: ExecuteStatusCode, example: ExecuteStatusCode.FILLED })
  EXE_STATUS_CODE: ExecuteStatusCode;

  @ApiProperty({ type: String, example: '部分成交' })
  EXE_STATUS: string;

  @ApiProperty({ type: String, example: '' })
  ORDERNO: string;

  @ApiProperty({ enum: OrderMethods, example: OrderMethods.IN_PERSON })
  ORDER_METHOD: OrderMethods;

  @ApiProperty({ type: Number, example: 0 })
  ORDER_ERR_CODE: number;

  @ApiProperty({ type: String, example: '' })
  ORDER_ERR_MSG: string;

  @ApiProperty({ type: String, example: '' })
  IP: string;

  @ApiProperty({
    enum: SettleCurrency,
    example: SettleCurrency.ForeignCurrency,
  })
  SETTLE_CURRENCY: SettleCurrency;

  @ApiProperty({ type: String, example: '' })
  AGNET_ID: string;

  @ApiProperty({ type: String, example: 'AG' })
  SYSTEM_ID: string;

  @ApiProperty({ type: String, example: '0' })
  ACTION: string;

  @ApiProperty({ type: String, example: '全球交易中心' })
  CHANNEL: string;

  @ApiProperty({ type: String, example: 'LMT' })
  ORD_TYPE: string;

  @ApiProperty({ type: Number, example: 0 })
  TRIGGER_PRICE: number;

  @ApiProperty({ type: String, example: '2021/10/06 00:00:00' })
  MATURITY_DATE: string;

  @ApiProperty({
    enum: LongTermOrderStatus,
    example: LongTermOrderStatus.Invalid,
  })
  GTD_STATUS: LongTermOrderStatus;

  @ApiProperty({ type: String, example: '' })
  ORDERNO_MAIN: string;

  @ApiProperty({ type: String, example: '' })
  ORDERNO_SUB: string;
}

export class GetOrderEntrustmentsResponse {
  @ApiProperty({ type: String, example: '2016/08/29 13:06:50' })
  CREATE_TIME: string;

  @ApiProperty({ type: String, example: '2016/08/29 13:06:50' })
  TRADE_DATE: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ enum: TradeTypes, example: TradeTypes.Sell })
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ type: String, example: 'US' })
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  TRADE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 10.11111 })
  PRICE: number;

  @ApiProperty({ type: Number, example: 3.33241 })
  QTY: number;

  @ApiProperty({ type: Number, example: 3.1554 })
  REPLACE_QTY: number;

  @ApiProperty({ type: Number, example: 0 })
  REPLACE_PRICE: number;

  @ApiProperty({ type: String, example: '2' })
  SALES_STATUS_CODE: string;

  @ApiProperty({ type: String, example: '' })
  SALES_STATUS: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  EXE_QTY: number;

  @ApiProperty({ type: Number, example: 130.45 })
  EXE_AVG_PRICE: number;

  @ApiProperty({ enum: ExecuteStatusCode, example: ExecuteStatusCode.FILLED })
  EXE_STATUS_CODE: ExecuteStatusCode;

  @ApiProperty({ type: String, example: '部分成交' })
  EXE_STATUS: string;

  @ApiProperty({ type: String, example: '' })
  ORDERNO: string;

  @ApiProperty({ type: Number, example: 0 })
  SEQNUM: number;

  @ApiProperty({ type: Number, example: 0 })
  ORIG_SEQNUM: number;

  @ApiProperty({ enum: OrderMethods, example: OrderMethods.IN_PERSON })
  ORDER_METHOD: OrderMethods;

  @ApiProperty({ type: Number, example: 0 })
  ORDER_ERR_CODE: number;

  @ApiProperty({ type: String, example: '' })
  ORDER_ERR_MSG: string;

  @ApiProperty({ type: String, example: '' })
  IP: string;

  @ApiProperty({
    enum: SettleCurrency,
    example: SettleCurrency.ForeignCurrency,
  })
  SETTLE_CURRENCY: SettleCurrency;

  @ApiProperty({ type: String, example: '' })
  AGNET_ID: string;

  @ApiProperty({ type: String, example: 'AG' })
  SYSTEM_ID: string;

  @ApiProperty({ type: String, example: '0' })
  ACTION: string;

  @ApiProperty({ type: String, example: '成交價金' })
  CHANNEL: string;

  @ApiProperty({ type: Number, example: 0 })
  GROSSCONSIDERATION: number;

  @ApiProperty({ type: String, example: 'LMT' })
  ORD_TYPE: string;

  @ApiProperty({ type: Number, example: 0 })
  TRIGGER_PRICE: number;

  @ApiProperty({ type: String, example: '2021/10/06 00:00:00' })
  MATURITY_DATE: string;

  @ApiProperty({ type: String, example: '' })
  GTD_ORD_NO: string;

  @ApiProperty({ type: String, example: '4' })
  TRADE_KIND: string;

  @ApiProperty({ type: String, example: 'N' })
  DEL_STATE: string;

  @ApiProperty({ type: String, example: 'N' })
  MOD_STATE: string;

  @ApiProperty({ type: String, example: '' })
  ORDERNO_MAIN: string;

  @ApiProperty({ type: String, example: '' })
  ORDERNO_SUB: string;
}

export class GetOrderTransactionsResponse {
  @ApiProperty({ type: String, example: '2016/08/29 13:06:50' })
  TRADE_DATE: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ enum: TradeTypes, example: TradeTypes.Sell })
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ type: String, example: 'US' })
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  TRADE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  EXE_QTY: number;

  @ApiProperty({ type: Number, example: 130.45 })
  EXE_AVG_PRICE: number;

  @ApiProperty({ type: Number, example: 130.45 })
  EXE_PRICE: number;

  @ApiProperty({ type: String, example: '' })
  ORDERNO: string;

  @ApiProperty({
    enum: SettleCurrency,
    example: SettleCurrency.ForeignCurrency,
  })
  SETTLE_CURRENCY: SettleCurrency;

  @ApiProperty({ type: String, example: 'AG' })
  SYSTEM_ID: string;

  @ApiProperty({ type: String, example: '成交價金' })
  CHANNEL: string;

  @ApiProperty({ type: String, example: '4' })
  TRADE_KIND: string;
}

export class GetTradeOverviewResponse {
  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '米奇' })
  CUSTOMER_NAME: string;

  @ApiProperty({ enum: TradeTypes, example: TradeTypes.Sell })
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ type: String, example: 'US' })
  MARKET: string;

  @ApiProperty({ type: String, example: 'AAPL.O' })
  SYMBOL: string;

  @ApiProperty({ type: String, example: '蘋果' })
  SYMBOL_NAME: string;

  @ApiProperty({ type: String, example: 'USD' })
  TRADE_CURRENCY: string;

  @ApiProperty({ type: Number, example: 3.33241 })
  QTY: number;

  @ApiProperty({ type: Number, example: 3.33241 })
  EXE_QTY: number;

  @ApiProperty({ type: Number, example: 130.45 })
  EXE_AVG_PRICE: number;

  @ApiProperty({
    enum: SettleCurrency,
    example: SettleCurrency.ForeignCurrency,
  })
  SETTLE_CURRENCY: SettleCurrency;

  @ApiProperty({ type: String, example: 'AG' })
  SYSTEM_ID: string;

  @ApiProperty({ type: String, example: '4' })
  TRADE_KIND: string;
}

export class OrderResponse {
  @ApiProperty({ type: String, example: '123455621' })
  EORDERNO: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '211007000004' })
  ORDERNO: string;

  @ApiProperty({ type: Number, example: 5987331 })
  SEQNUM: number;

  @ApiProperty({ type: Number, example: 5987331 })
  ORDG_SEQNUM: number;

  @ApiProperty({ type: String, example: '委託失敗' })
  STATE: string;
}

export class GetStockFeeResponse {
  @ApiProperty({ type: Number, example: 2018 })
  TOTALAMOUNT: number;

  @ApiProperty({ type: Number, example: 0 })
  GROSSCONSIDERATION: number;

  @ApiProperty({ type: Number, example: 18 })
  CUSTODYFEE: number;
}

export class PlaceLongtermOrderResponse {
  @ApiProperty({ type: String, example: '0' })
  ERR_CODE: string;

  @ApiProperty({ type: String, example: 'Succeed' })
  ERR_MSG: string;

  @ApiProperty({ type: String, example: '00000000000000000008' })
  EORDERNO: string;

  @ApiProperty({ type: String, example: '20001365441' })
  CUSTOMER_ID: string;

  @ApiProperty({ type: String, example: '212207000004' })
  ORDERNO: string;

  @ApiProperty({ type: String, example: '委託失敗' })
  STATE: string;
}

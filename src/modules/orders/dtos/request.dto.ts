import { AccountCustomerDto } from '@modules/accounts/dtos/request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  LongTermOrderStatus,
  Markets,
  MsgTypes,
  OrderChannels,
  OrderTypes,
  ProdTypes,
  SettleCurrency,
  TradeKind,
  TradeTypes,
} from 'src/shared/enums/app.enums';

export class GetOrderEnstrustmentsDto extends AccountCustomerDto {
  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    type: String,
    example: '2021/10/06',
    description: 'Trading date - from',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATES: string = '';

  @ApiProperty({
    type: String,
    example: '2024/10/06',
    description: 'Trading date - to',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATEE: string = '';

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}

export class GetOrderTransactionsDto extends AccountCustomerDto {
  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: false,
  })
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    type: String,
    example: '2021/10/06',
    description: 'Trading date - from',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATES: string = '';

  @ApiProperty({
    type: String,
    example: '2024/10/06',
    description: 'Trading date - to',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATEE: string = '';

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}
export class GetOrdersDto extends AccountCustomerDto {
  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: false,
  })
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    type: String,
    example: '2021/10/06',
    description: 'Trading date - from',
    required: true,
  })
  @IsString()
  TRADE_DATES: string;

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}

export class GetDailyTradeOverviewDTO extends AccountCustomerDto {
  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    type: String,
    example: '',
    description: 'Trading date - from',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATES: string = '';

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}

export class GetLongTermOrderDto extends AccountCustomerDto {
  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: 'AAPL',
    description: 'Symbol',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    type: String,
    example: '2024/06/26',
    description: 'Trading date - from',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATES: string;

  @ApiProperty({
    type: String,
    example: '2024/12/28',
    description: 'Trading date - to',
    required: false,
  })
  @IsOptional()
  @IsString()
  TRADE_DATEE: string;

  @ApiProperty({
    type: LongTermOrderStatus,
    example: LongTermOrderStatus.Invalid,
    description: 'Long-term order status',
    required: true,
  })
  @IsString()
  GTD_STATUS: LongTermOrderStatus;
}

export class PlaceLongTermOrderDTO {
  @ApiProperty({
    enum: MsgTypes,
    example: MsgTypes.Add,
    description: '類別',
    required: true,
  })
  @IsString()
  MSGTYPE: MsgTypes;

  @ApiProperty({
    enum: OrderChannels,
    example: OrderChannels.RU,
    description: 'Order placement channel',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYSTEM_ID: OrderChannels = OrderChannels.RU;

  @ApiProperty({
    type: String,
    example: '00.00.00.00',
    description: 'Customer IP',
    required: true,
  })
  @IsString()
  IP: string;

  @ApiProperty({
    type: String,
    example: '20001365441',
    description: 'Customer account',
    required: true,
  })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({
    type: String,
    example: 'L220289830',
    description: 'Customer ID',
    required: true,
  })
  @IsString()
  ID: string;

  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: true,
  })
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '2021/10/06',
    description: 'Trading date - from',
    required: true,
  })
  @IsString()
  TRADE_DATE: string;

  @ApiProperty({
    enum: TradeTypes,
    example: TradeTypes.Sell,
    description: 'Trade type',
    required: true,
  })
  @IsString()
  TRADE_TYPE: TradeTypes;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: true,
  })
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Quantity',
    required: true,
  })
  @IsNumber()
  QTY: number;

  @ApiProperty({
    type: Number,
    example: 36.41,
    description: 'Price',
    required: true,
  })
  @IsNumber()
  PRICE: number;

  @ApiProperty({
    enum: SettleCurrency,
    example: '',
    description: 'Settlement Currency',
    required: true,
  })
  @IsString()
  SETTLE_CURRENCY: string = SettleCurrency.ForeignCurrency;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Order Placement Method',
    required: true,
  })
  @IsString()
  ORDER_METHOD: string = '';

  @ApiProperty({
    type: String,
    example: OrderChannels.RU,
    description: 'Order placement channel',
    required: true,
  })
  @IsOptional()
  @IsString()
  EORDERNO: string;

  @ApiProperty({
    enum: OrderTypes,
    example: OrderTypes.LimitOrder,
    description: 'Order type',
    required: false,
  })
  @IsString()
  ORD_TYPE: OrderTypes;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Trigger Price',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  TRIGGER_PRICE: number;

  @ApiProperty({
    type: String,
    example: '2021/10/06',
    required: false,
  })
  @IsOptional()
  @IsString()
  MATURITY_DATE: string;

  @ApiProperty({ type: String, example: '', required: false })
  @IsOptional()
  @IsString()
  GTD_ORD_NO: string;
}

export class BatchPlaceLongTermOrderDTO {
  @ApiProperty({
    type: String,
    example: 'L220289830',
    description: '客戶ID',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    example: 'o',
    description: '平台來源別',
    required: true,
  })
  @IsString()
  dtaSrc: string;

  @ApiProperty({ type: [PlaceLongTermOrderDTO], required: true })
  @IsArray()
  orderList: PlaceLongTermOrderDTO[];

  @ApiProperty({
    type: String,
    example: '12345678',
    description: 'CA Cert(憑證序號)',
    required: true,
  })
  @IsString()
  caCert: string;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'CA密文長度',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  caLen: number;

  @ApiProperty({
    type: String,
    example: '',
    description: 'CA密文',
    required: true,
  })
  @IsString()
  encodedCA: string;

  @ApiProperty({ type: String, example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  orderData: string;
}

export class ManageOrderDto {
  @ApiProperty({
    enum: MsgTypes,
    example: MsgTypes.Add,
    description: '類別',
    required: true,
  })
  @IsString()
  MSGTYPE: MsgTypes;

  @ApiProperty({
    type: String,
    example: '00.00.00.00',
    description: 'Customer IP',
    required: true,
  })
  @IsString()
  IP: string;

  @ApiProperty({
    type: String,
    example: '20001365441',
    description: 'Customer account',
    required: true,
  })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({
    type: String,
    example: 'L220289830',
    description: 'Customer ID',
    required: true,
  })
  @IsString()
  ID: string;

  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '2021/10/10',
    description: 'Trade date',
    required: true,
  })
  @IsString()
  TRADE_DATE: string;

  @ApiProperty({
    enum: TradeTypes,
    example: TradeTypes.Sell,
    description: 'Trade type',
    required: true,
  })
  @IsString()
  TRADE_TYPE: TradeTypes;

  @ApiProperty({
    type: String,
    example: 'APPL.O',
    description: 'Symbol',
    required: true,
  })
  @IsString()
  SYMBOL: string;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Quantity',
    required: true,
  })
  @IsNumber()
  QTY: number;

  @ApiProperty({
    type: Number,
    example: 36.41,
    description: 'Price',
    required: true,
  })
  @IsNumber()
  PRICE: number;

  @ApiProperty({
    type: Number,
    example: 8,
    description: 'Adjusted Unit Quantity',
    required: true,
  })
  @IsNumber()
  REPLACE_QTY: number;

  @ApiProperty({
    type: Number,
    example: 136.41,
    description: 'Adjusted Price',
    required: true,
  })
  @IsNumber()
  REPLACE_PRICE: number;

  @ApiProperty({
    enum: SettleCurrency,
    example: '',
    description: 'Settlement Currency',
    required: false,
  })
  @IsOptional()
  @IsString()
  SETTLE_CURRENCY: string = SettleCurrency.ForeignCurrency;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Sequence number (for MSGTYPE="DEL","MOD")',
    required: false,
  })
  @IsOptional()
  @IsString()
  SEQNUM: string = '';

  @ApiProperty({
    type: String,
    example: '',
    description: 'Order Placement Method',
    required: false,
  })
  @IsString()
  ORDER_METHOD: string = '';

  @ApiProperty({
    enum: OrderChannels,
    example: OrderChannels.RU,
    description: 'Order placement channel',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYSTEM_ID: OrderChannels = OrderChannels.RU;

  @ApiProperty({
    type: String,
    example: OrderChannels.RU,
    description: 'Order placement channel',
    required: true,
  })
  @IsOptional()
  @IsString()
  EORDERNO: string;

  @ApiProperty({
    enum: OrderTypes,
    example: OrderTypes.LimitOrder,
    description: 'Order type',
    required: false,
  })
  @IsString()
  ORD_TYPE: OrderTypes;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Trigger Price',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  TRIGGER_PRICE: number;

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsNumber()
  TRADE_KIND: TradeKind;
}

export class ManageBatchOrderDto {
  @ApiProperty({
    type: String,
    example: 'L220289830',
    description: '客戶ID',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    example: 'o',
    description: '平台來源別',
    required: true,
  })
  @IsString()
  dtaSrc: string;

  @ApiProperty({ type: [ManageOrderDto], required: true })
  @IsArray()
  orderList: ManageOrderDto[];

  @ApiProperty({
    type: String,
    example: '8',
    description: 'CA Cert(憑證序號)',
    required: true,
  })
  @IsString()
  caCert: string;

  @ApiProperty({ example: 4, description: 'CA密文長度', required: true })
  @Type(() => Number)
  @IsNumber()
  caLen: number;

  @ApiProperty({
    type: String,
    example: 'caLen8',
    description: 'CA密文',
    required: true,
  })
  @IsString()
  encodedCA: string;

  @ApiProperty({ type: String, example: '', description: '', required: false })
  @IsOptional()
  @IsString()
  orderData: string;
}

export class GetStockFee {
  @ApiProperty({
    enum: OrderChannels,
    example: OrderChannels.RU,
    description: 'Order placement channel',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYSTEM_ID: OrderChannels = OrderChannels.RU;

  @ApiProperty({
    type: String,
    example: '00.00.00.00',
    description: 'Customer IP',
    required: true,
  })
  @IsString()
  IP: string;

  @ApiProperty({
    type: String,
    example: '20001365441',
    description: 'Customer account',
    required: true,
  })
  @IsString()
  CUSTOMER_ID: string;

  @ApiProperty({
    type: String,
    example: 'L220289830',
    description: 'Customer ID',
    required: true,
  })
  @IsString()
  ID: string;

  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYMBOL: string = '';

  @ApiProperty({
    enum: TradeTypes,
    example: TradeTypes.Sell,
    description: 'Trade type',
    required: true,
  })
  @IsString()
  TRADE_TYPE: TradeTypes;

  @ApiProperty({ example: 36.41, description: 'Price', required: true })
  @Type(() => Number)
  @IsNumber()
  PRICE: number;

  @ApiProperty({ example: 10, description: 'Quantity', required: true })
  @Type(() => Number)
  @IsNumber()
  QTY: number;

  @ApiProperty({
    enum: SettleCurrency,
    example: SettleCurrency.ForeignCurrency,
    description: 'Settlement Currency',
    required: true,
  })
  @IsString()
  SETTLE_CURRENCY: string = SettleCurrency.ForeignCurrency;

  @ApiProperty({
    enum: ProdTypes,
    example: ProdTypes.EQTY,
    description: 'Product Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  PROD_TYPE: string = ProdTypes.ALL;
}

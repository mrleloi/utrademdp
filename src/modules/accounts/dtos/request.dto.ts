import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Markets,
  OrderChannels,
  ProdTypes,
  QueryTypes,
  SettleCurrency,
  SrcTypes,
  TradeKind,
} from 'src/shared/enums/app.enums';

export class AccountCustomerDto {
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
    example: '20000010854',
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
}

export class AccountPositionDto extends AccountCustomerDto {
  @ApiProperty({
    enum: Markets,
    example: Markets.ALL,
    description: 'Trading market',
    required: false,
  })
  @IsString()
  @IsOptional()
  MARKET: Markets = Markets.ALL;

  @ApiProperty({
    enum: ProdTypes,
    example: ProdTypes.EQTY,
    description: 'Product Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  PROD_TYPE: string = ProdTypes.ALL;

  @ApiProperty({
    type: SettleCurrency,
    example: '',
    description: 'Settlement currency',
    required: false,
  })
  @IsOptional()
  @IsString()
  SETTLE_CURRENCY: string = '';

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}

export class AccountPositionDetailDto {
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
    example: '20000010854',
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
    enum: ProdTypes,
    example: ProdTypes.EQTY,
    description: 'Product Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  PROD_TYPE: string = ProdTypes.ALL;

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
    enum: SettleCurrency,
    example: '',
    description: 'Settlement Currency',
    required: false,
  })
  @IsOptional()
  @IsString()
  SETTLE_CURRENCY: string = SettleCurrency.ForeignCurrency;

  @ApiProperty({
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;

  @ApiProperty({
    type: String,
    example: '',
    description: 'Symbol',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYMBOL: string = '';
}

export class GetStatmenetDto extends AccountCustomerDto {
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
    type: String,
    example: '2024/10/06',
    description: 'Trading date - to',
    required: true,
  })
  @IsString()
  TRADE_DATEE: string;

  @ApiProperty({
    enum: QueryTypes,
    example: QueryTypes.All,
    description: 'Query Type',
    required: true,
  })
  @IsString()
  QUERY_TYPE: string;

  @ApiProperty({
    enum: ProdTypes,
    example: ProdTypes.EQTY,
    description: 'Product Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  PROD_TYPE: string = ProdTypes.ALL;

  @ApiProperty({
    enum: SrcTypes,
    example: SrcTypes.ALL,
    description: '交易來源',
    required: false,
  })
  @IsOptional()
  @IsString()
  SRC_TYPE: SrcTypes = SrcTypes.ALL;
}

export class GetNonTradingDto extends AccountCustomerDto {
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
    type: String,
    example: '2024/10/06',
    description: 'Trading date - to',
    required: true,
  })
  @IsString()
  TRADE_DATEE: string;

  @ApiProperty({
    enum: SrcTypes,
    example: SrcTypes.ALL,
    description: '交易來源',
    required: false,
  })
  @IsOptional()
  @IsString()
  SRC_TYPE: SrcTypes = SrcTypes.ALL;
}

export class GetTabRecordsDto extends AccountPositionDto {
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

import { AccountPositionDto } from '@modules/accounts/dtos/request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  Currencies,
  OrderChannels,
  ProdTypes,
  TradeKind,
} from 'src/shared/enums/app.enums';

export class GetRealizedDto {
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
    type: String,
    example: '',
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: string = '';

  @ApiProperty({
    type: String,
    example: 'AAPL.O',
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
    type: String,
    example: '',
    description: 'Sort Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  SORT_TYPE: string = '';

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
    enum: TradeKind,
    example: TradeKind.All,
    description: 'Transaction type',
    required: true,
  })
  @IsString()
  TRADE_KIND: TradeKind;
}

export class GetRealizedDetailDto {
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
    type: String,
    example: '123456',
    description: 'Sequence number',
    required: true,
  })
  @IsString()
  RANSOM_SEQNO: string;
}

export class GetUnrealizedDto extends AccountPositionDto {}

export class GetDailyPnLDto {
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
    type: String,
    example: '',
    description: 'Trading market',
    required: false,
  })
  @IsOptional()
  @IsString()
  MARKET: string = '';

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

export class GetDailyPnLDetailDto {
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
    type: String,
    example: '',
    description: 'Trading market',
    required: false,
  })
  @IsString()
  @IsOptional()
  MARKET: string = '';

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
    example: 'AAPL.O',
    description: 'Symbol',
    required: true,
  })
  @IsString()
  SYMBOL: string;

  @ApiProperty({
    type: String,
    example: 'ASC22026395',
    description: 'Transaction reference number',
    required: true,
  })
  @IsString()
  TRANSACTION_REF: string;
}

export class GetDailyExchangeRate {
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
    example: 'L220289830',
    description: 'Customer ID',
    required: true,
  })
  @IsString()
  ID: string;

  @ApiProperty({
    enum: Currencies,
    example: Currencies.USD,
    description: 'Currency',
    required: true,
  })
  @IsString()
  CURRENCY: Currencies;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Currencies, OrderChannels, Phares } from 'src/shared/enums/app.enums';

export class AddCashDto {
  @ApiProperty({
    type: String,
    example: 'o',
    description: 'dtaSrc',
    required: false,
  })
  @IsOptional()
  @IsString()
  dtaSrc: string = '';

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
    enum: Currencies,
    example: Currencies.USD,
    description: 'Currency',
    required: true,
  })
  @IsString()
  CURRENCY: Currencies;

  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Commission Amount',
    required: true,
  })
  @IsNumber()
  AMOUNT: number;

  @ApiProperty({
    type: String,
    example: '2021/10/10',
    description: 'Application Date',
    required: true,
  })
  @IsString()
  APPLY_DATE: string;

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
    example: '8',
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

export class QueryCashDto {
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
    enum: Currencies,
    example: Currencies.USD,
    description: 'Currency',
    required: true,
  })
  @IsString()
  CURRENCY: Currencies;

  @ApiProperty({
    type: String,
    example: '2021/10/10',
    description: 'Application Date',
    required: true,
  })
  @IsString()
  APPLY_DATE: string;
}

export class DeleteCashDto {
  @ApiProperty({
    type: String,
    example: 'o',
    description: 'dtaSrc',
    required: false,
  })
  @IsOptional()
  @IsString()
  dtaSrc: string = '';

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
    enum: Currencies,
    example: Currencies.USD,
    description: 'Currency',
    required: true,
  })
  @IsString()
  CURRENCY: Currencies;

  @ApiProperty({
    type: String,
    example: '2021/10/10',
    description: 'Application Date',
    required: true,
  })
  @IsString()
  APPLY_DATE: string;

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

export class CashReportDto {
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
    enum: Currencies,
    example: Currencies.USD,
    description: 'Currency',
    required: false,
  })
  @IsOptional()
  @IsString()
  CURRENCY: Currencies;

  @ApiProperty({
    type: String,
    example: '2021/10/10',
    description: 'Application Date(From)',
    required: true,
  })
  @IsString()
  APPLY_START_DATE: string;

  @ApiProperty({
    type: String,
    example: '2021/10/11',
    description: 'Application Date(to)',
    required: true,
  })
  @IsString()
  APPLY_END_DATE: string;

  @ApiProperty({
    enum: Phares,
    example: Phares.All,
    description: 'Withdrawal Phase',
    required: true,
  })
  @IsString()
  PHASE: Phares;

  @ApiProperty({
    enum: OrderChannels,
    example: OrderChannels.RU,
    description: 'Order placement channel',
    required: false,
  })
  @IsOptional()
  @IsString()
  SYSTEM_ID: OrderChannels = OrderChannels.RU;
}

export class UnHoldRequestDto {
  @ApiProperty({
    type: String,
    example: 'o',
    description: '平台來源別',
    required: true,
  })
  @IsString()
  dtaSrc: string;

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
    enum: Currencies,
    example: Currencies.USD,
    description: 'Currency',
    required: true,
  })
  @IsString()
  CURRENCY: Currencies;

  @ApiProperty({
    type: String,
    example: '2022/10/27',
    description: 'Application Date',
    required: true,
  })
  @IsString()
  APPLY_DATE: string;

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
    example: '12345678',
    description: 'CA Cert(憑證序號)',
    required: true,
  })
  @IsString()
  caCert: string;

  @ApiProperty({
    type: String,
    example: '0',
    description: 'CA密文長度',
    required: false,
  })
  @IsOptional()
  @IsString()
  caLen: string;

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

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Currencies, OrderChannels } from 'src/shared/enums/app.enums';

export class GetPurchasingPowerDto {
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
}

export class GetBankBalanceInquiryDto {
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
}

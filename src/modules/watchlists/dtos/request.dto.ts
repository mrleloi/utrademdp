import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetWatchlistDto {
  @ApiProperty({
    type: String,
    example: 'DAQKGIAP',
    description: 'AppId',
    required: true,
  })
  @IsString()
  a: string;
  @ApiProperty({
    type: String,
    example: 'KGIAP-L220289830',
    description: 'UserId',
    required: true,
  })
  @IsString()
  b: string;
  @ApiProperty({
    type: String,
    example: 'XQ.SymbolList',
    description: 'DataType',
    required: true,
  })
  @IsString()
  d: string;
  @ApiProperty({
    type: String,
    example: '100',
    description: 'DataVer',
    required: true,
  })
  @IsString()
  e: string;
  @ApiProperty({
    type: String,
    example: '',
    description: 'Options',
    required: false,
  })
  @IsOptional()
  i: string;
}

export class WatchlistDto {
  @IsString()
  id: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  sortIdx: string;
  @IsOptional()
  @IsString()
  version: string;
  @IsOptional()
  @IsString()
  value: string;
  @IsOptional()
  @IsString()
  flag: string;
  @IsOptional()
  @IsBoolean()
  delete: boolean;
}
export class WatchlistXML {
  @IsString()
  version: string;
  @IsOptional()
  @IsString()
  ver: string;
  @IsOptional()
  @IsString()
  defaultIdx: string;
  @IsArray()
  @IsDefined()
  @ValidateNested()
  @Type(() => WatchlistDto)
  watchlists: WatchlistDto[];
}

export class SetWatchlistOptionDto {
  @ApiProperty({
    type: String,
    example: 'DAQKGIAP',
    description: 'AppId',
    required: true,
  })
  @IsString()
  a: string;
  @ApiProperty({
    type: String,
    example: 'KGIAP-L220289830',
    description: 'UserId',
    required: true,
  })
  @IsString()
  b: string;
  @ApiProperty({
    type: String,
    example: 'XQ.SymbolList',
    description: 'DataType',
    required: true,
  })
  @IsString()
  d: string;
  @ApiProperty({
    type: String,
    example: '4',
    description: 'Save Option',
    required: true,
  })
  @IsString()
  g: string;
}

export class SetWatchlistDto extends SetWatchlistOptionDto {
  @ApiProperty({
    type: Object,
    example: {
      version: '1',
      ver: '19',
      defaultIdx: '1',
      watchlists: [
        {
          id: 'watchlist 1',
          name: 'watchlist name',
          sortIdx: '1',
          flag: '0',
          delete: true,
          value: 'TSE.TW,OTC.TW',
        },
      ],
    },
    required: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => WatchlistXML)
  xml: WatchlistXML;
}

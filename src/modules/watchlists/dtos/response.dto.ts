import { ApiProperty } from '@nestjs/swagger';

class SymbolDto {
  @ApiProperty({ example: 'c505104a-eec8-4998-8a02-6b983cff8f17' })
  ID: string;

  @ApiProperty({ example: 'Test2' })
  Name: string;

  @ApiProperty({ example: '0' })
  Flag: string;

  @ApiProperty({ example: '1' })
  SortIdx: string;

  @ApiProperty({ example: '1' })
  Version: string;

  @ApiProperty({ example: 'TSE.TW,OTC.TW' })
  Value: string;
}

class SymbolListDto {
  @ApiProperty({ example: '100' })
  Version: string;

  @ApiProperty({ example: '78' })
  Ver: string;

  @ApiProperty({ example: '1' })
  DefaultIdx: string;

  @ApiProperty({ type: [SymbolDto] })
  List: SymbolDto[];
}

class ResultDto {
  @ApiProperty({ type: SymbolListDto })
  SymbolList: SymbolListDto;
}

export class WatchlistResponseDto {
  @ApiProperty({ type: ResultDto })
  Result: ResultDto;
}

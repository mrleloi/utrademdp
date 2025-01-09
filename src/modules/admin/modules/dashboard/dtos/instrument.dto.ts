import { ApiProperty } from '@nestjs/swagger';

export class CreateInstrumentDto {
  @ApiProperty()
  instrumentType: number;

  @ApiProperty()
  value: string;
}

export class UpdateInstrumentDto {
  @ApiProperty({ required: false })
  value?: string;

  @ApiProperty({ required: false })
  instrumentType?: number;
}

export class InstrumentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  instrumentType: {
    id: number;
    type_code: string;
    description: string;
  };

  @ApiProperty()
  value: string;

  @ApiProperty()
  created_at: Date;
}

export class InstrumentPaginatedResponseDto {
  @ApiProperty({ type: [InstrumentResponseDto] })
  items: InstrumentResponseDto[];

  @ApiProperty()
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class CreateInstrumentTypeDto {
  type_code: string;
  description: string;
}

export class UpdateInstrumentTypeDto {
  description: string;
}

export class InstrumentTypeResponseDto {
  id: number;
  type_code: string;
  description: string;
  created_at: Date;
}

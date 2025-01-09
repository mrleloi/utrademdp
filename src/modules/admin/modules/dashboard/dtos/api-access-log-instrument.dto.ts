export class CreateAccessLogInstrumentDto {
  accessLog: number;
  instrumentType: number;
  instrument_value: string;
}

export class AccessLogInstrumentResponseDto {
  id: number;
  accessLog: number;
  instrumentType: {
    id: number;
    type_code: string;
  };
  instrument_value: string;
  created_at: Date;
}

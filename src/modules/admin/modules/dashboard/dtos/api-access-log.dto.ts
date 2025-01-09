export class CreateAccessLogDto {
  apiUser: number;
  apiEndpoint: number;
  request_params?: object;
  response_status?: number;
  error_message?: string;
}

export class AccessLogResponseDto {
  id: number;
  apiUser: {
    id: number;
    username: string;
  };
  apiEndpoint: {
    id: number;
    endpoint_pattern: string;
    method: string;
    apiGroup: {
      id: number;
      group_code: string;
    };
  };
  request_params: object;
  access_time: Date;
  response_status: number;
  error_message: string;
}

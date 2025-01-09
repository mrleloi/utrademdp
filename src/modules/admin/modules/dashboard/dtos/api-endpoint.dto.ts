export class CreateEndpointDto {
  endpoint_pattern: string;
  method: string;
  description: string;
  path_params: object;
  query_params?: object;
  apiGroup: number;
}

export class UpdateEndpointDto {
  endpoint_pattern?: string;
  method?: string;
  description?: string;
  path_params?: object;
  query_params?: object;
  apiGroup?: number;
}

export class EndpointResponseDto {
  id: number;
  endpoint_pattern: string;
  method: string;
  description: string;
  path_params: object;
  query_params: object;
  apiGroup: {
    id: number;
    group_code: string;
  };
  created_at: Date;
}

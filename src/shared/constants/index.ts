export * from './api';

export enum PermissionLevel {
  GROUP = 'GROUP',
  ENDPOINT = 'ENDPOINT',
}

export interface EndpointPattern {
  pattern: string;
  instrumentParams: string[];
  otherParams: string[];
}

export interface OpenAPIParameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: {
    type: string;
    format?: string;
    enum?: string[];
  };
}

export interface OpenAPIOperation {
  parameters?: OpenAPIParameter[];
  description?: string;
  // other OpenAPI operation properties
}

export interface OpenAPIPathItem {
  parameters?: OpenAPIParameter[];
  get?: OpenAPIOperation;
  post?: OpenAPIOperation;
  put?: OpenAPIOperation;
  delete?: OpenAPIOperation;
  patch?: OpenAPIOperation;
  // other HTTP methods
}

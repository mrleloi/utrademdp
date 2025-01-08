import { API_IDS } from '@shared/constants';

export interface ApiConfig {
  id: ApiId;
  name: string;
  url?: string;
  tokenSecret?: string;
}

export type ApiId = keyof typeof API_IDS;

import { Request } from 'express';

export interface ITokenExtractor {
  extractToken(req: Request): string | undefined;
}

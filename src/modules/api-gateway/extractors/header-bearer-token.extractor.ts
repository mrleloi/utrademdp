import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ITokenExtractor } from '@common/interfaces/token-extractor.interface';

@Injectable()
export class HeaderBearerTokenExtractor implements ITokenExtractor {
  extractToken(req: Request): string | undefined {
    return req.headers.authorization?.split(' ')[1];
  }
}

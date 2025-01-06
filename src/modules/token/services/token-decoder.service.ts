@Injectable()
export class TokenDecoderService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: RedisService,
  ) {}

  async decodeInnoDataToken(token: string): Promise<DecodedTokenDto> {
    // Implementation
  }

  async decodeMarketDataToken(token: string, type: string): Promise<DecodedTokenDto> {
    // Implementation
  }
}
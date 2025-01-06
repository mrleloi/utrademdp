@Injectable()
export class MarketDataHttpService extends BaseHttpService {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async getMarketData(token: string, params: any): Promise<any> {
    return this.get('/data', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
  }
}
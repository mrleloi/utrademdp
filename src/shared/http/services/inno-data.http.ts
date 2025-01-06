@Injectable()
export class InnoDataHttpService extends BaseHttpService {
  constructor() {
    super(config.axios.innoDataEndpoint);
  }

  async getQuote(token: string, ric: string): Promise<any> {
    return this.get('/quote', {
      headers: { Authorization: `Bearer ${token}` },
      params: { ric },
    });
  }
}
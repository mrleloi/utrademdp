@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(ClientPermission)
    private permissionRepo: Repository<ClientPermission>,
    private cacheService: CacheService
  ) {}

  async validateAccess(clientId: string, endpoint: string, marketData?: any): Promise<boolean> {
    // Check cache first
    const cacheKey = `perm:${clientId}:${endpoint}`;
    const cachedPermission = await this.cacheService.get(cacheKey);
    if (cachedPermission) {
      return this.evaluatePermission(JSON.parse(cachedPermission), marketData);
    }

    // Get from database
    const permission = await this.permissionRepo.findOne({
      where: {
        client: { client_id: clientId },
        endpoint: { path: endpoint },
        status: 'active'
      },
      relations: ['endpoint']
    });

    if (!permission) return false;

    // Cache permission
    await this.cacheService.set(cacheKey, JSON.stringify(permission), 3600);

    return this.evaluatePermission(permission, marketData);
  }

  private evaluatePermission(permission: ClientPermission, marketData?: any): boolean {
    if (!permission) return false;

    // Check if permission is valid
    const now = new Date();
    if (now < permission.valid_from || now > permission.valid_until) {
      return false;
    }

    // Check market data access if required
    if (marketData) {
      return this.validateMarketDataAccess(permission.market_data_access, marketData);
    }

    return true;
  }

  private validateMarketDataAccess(access: any, marketData: any): boolean {
    // Implement market data validation logic
    return access.markets.includes(marketData.market);
  }
}
@Injectable()
export class ClientManagementService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
    @InjectRepository(ClientPermission)
    private permissionRepo: Repository<ClientPermission>,
    private cacheService: CacheService
  ) {}

  async updateClientPermissions(clientId: string, permissions: any) {
    await this.connection.transaction(async manager => {
      // Update permissions
      await manager.save(ClientPermission, permissions);

      // Invalidate cache
      await this.cacheService.deletePattern(`perm:${clientId}:*`);
    });
  }

  async getClientOverview(clientId: string) {
    const [client, permissions, usage] = await Promise.all([
      this.clientRepo.findOne({ where: { client_id: clientId } }),
      this.permissionRepo.find({
        where: { client: { client_id: clientId } },
        relations: ['endpoint']
      }),
      this.getClientUsageStats(clientId)
    ]);

    return {
      client,
      permissions,
      usage
    };
  }
}
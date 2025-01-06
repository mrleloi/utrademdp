@Module({
  imports: [HttpModule],
  controllers: [InnoAuthController],
  providers: [InnoAuthService, RedisService],
})
export class InnoAuthModule {}
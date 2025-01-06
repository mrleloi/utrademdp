@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    JwtModule.register({
      secret: process.env.ADMIN_JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
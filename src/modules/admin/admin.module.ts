/*
import { SharedModule } from "../../shared/shared.module";
import { AdminDatabaseModule } from "../../database/admin.database";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    JwtModule.register({
      secret: process.env.ADMIN_JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    SharedModule,
    AdminDatabaseModule,
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminModule {}
*/

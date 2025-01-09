import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@modules/admin/modules/auth/services/auth.service';
import { AuthController } from '@modules/admin/modules/auth/controllers/auth.controller';
import { UsersModule } from '@modules/admin/modules/users/users.module';
import { LocalStrategy } from '@modules/admin/strategies/local.strategy';
import { JwtStrategy } from '@modules/admin/strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Store secret in environment variables
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

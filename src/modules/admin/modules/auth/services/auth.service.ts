// services/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '@modules/admin/modules/auth/dtos/register.dto';
import { User } from '../../../../../database/entities/user.entity';
import { UsersService } from '@modules/admin/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.is_active) {
      throw new UnauthorizedException(
        'Invalid credentials or inactive account',
      );
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.usersService.updateLastLogin(user);

    const { password, ...result } = user;
    console.log(password);
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user with default role
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return user;
  }

  /*async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      // Don't reveal if email exists
      return;
    }

    // Generate reset token
    const resetToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '1h' },
    );

    // Save reset token hash
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    // await this.usersService.saveResetToken(user.id, resetTokenHash);

    // Send email with reset link (implement email service separately)
    // await this.emailService.sendPasswordReset(user.email, resetToken);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    // Verify token
    try {
      const payload = this.jwtService.verify(dto.token);
      const user = await this.usersService.findOne(payload.sub);

      // Verify token hash
      const isValidToken = await this.usersService.verifyResetToken(
        user.id,
        dto.token,
      );
      if (!isValidToken) {
        throw new Error('Invalid token');
      }

      // Update password
      const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
      await this.usersService.updatePassword(user.id, hashedPassword);

      // Clear reset token
      await this.usersService.clearResetToken(user.id);
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }*/
}

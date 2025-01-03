import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/request.dto';
import { UserWhitelist } from './entities/whitelist.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserWhitelist)
    private whitelistRepository: Repository<UserWhitelist>,
  ) {}

  async findById(user_id: string): Promise<User> {
    let user = await this.usersRepository.findOneBy({ user_id });
    if (!user) {
      const isPro = await this.whitelistRepository.findOneBy({ user_id });
      user = new User();
      user.user_id = user_id;
      user.user_professional = isPro != null;
      user.user_accept_tc = false;
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const isPro = await this.whitelistRepository.findOneBy({
      user_id: user.user_id,
    });
    user.user_professional = isPro != null;
    return this.usersRepository.save(user);
  }
}

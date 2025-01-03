import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Configuration)
    private configRepository: Repository<Configuration>,
  ) {}

  async find() {
    return await this.configRepository.find();
  }
}

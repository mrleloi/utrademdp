/*
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis('tokens') private readonly tokenRedis: Redis,
    @InjectRedis('users') private readonly userRedis: Redis,
    @InjectRedis('instruments') private readonly instrumentRedis: Redis,
  ) {}

  // Token caching
  async getCachedToken(key: string): Promise<string | null> {
    return this.tokenRedis.get(key);
  }

  async setCachedToken(key: string, token: string, ttl: number): Promise<void> {
    await this.tokenRedis.set(key, token, 'EX', ttl);
  }

  // User caching
  async getCachedUser(userId: string): Promise<any> {
    const data = await this.userRedis.get(`user:${userId}`);
    return data ? JSON.parse(data) : null;
  }

  async setCachedUser(userId: string, userData: any): Promise<void> {
    await this.userRedis.set(
      `user:${userId}`,
      JSON.stringify(userData),
      'EX',
      3600 // 1 hour cache
    );
  }

  // Instrument caching
  async getCachedInstrument(key: string): Promise<any> {
    const data = await this.instrumentRedis.get(`instrument:${key}`);
    return data ? JSON.parse(data) : null;
  }

  async setCachedInstrument(key: string, data: any): Promise<void> {
    await this.instrumentRedis.set(
      `instrument:${key}`,
      JSON.stringify(data),
      'EX',
      86400 // 24 hours cache
    );
  }
}*/

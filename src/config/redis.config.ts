import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';

export const redisConfig: RedisModuleOptions = {
  config: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    // Separate Redis databases for different purposes
    db: {
      tokens: 0,    // Token cache
      users: 1,     // User cache
      instruments: 2 // Instrument cache
    }
  }
};
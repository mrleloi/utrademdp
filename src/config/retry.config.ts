export const retryConfig = {
  // Global retry config
  retries: 3,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: 10000,

  // Operation specific configs
  operations: {
    tokenRefresh: {
      retries: 5,
      minTimeout: 500,
    },
    auditLog: {
      retries: 2,
      minTimeout: 100,
    },
  },
};

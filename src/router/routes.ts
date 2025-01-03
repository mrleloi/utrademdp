export const AppRoutes = {
  users: {
    tag: 'users',
    professional: 'professional',
  },
  watchlists: {
    tag: 'watchlist',
  },
  search: {
    tag: 'search-history',
    tradeable: 'tradeable',
  },
  accounts: {
    tag: 'accounts',
    info: 'info',
    overview: 'overview',
    tabs: 'tab-records',
    statement: 'statement',
    nonTrading: 'non-trading',
  },
  portfolio: {
    tag: 'portfolio',
    inventory: 'inventory',
    inventoryDetail: 'inventory/detail',
    realized: 'realized',
    realizedDetail: 'realized/detail',
    unrealized: 'unrealized',
    dailyPnL: 'daily-pnl',
    dailyPnLDetail: 'daily-pnl/detail',
    dailyExchangeRate: 'exchange-rate/daily',
  },
  orders: {
    tag: 'orders',
    entrustments: 'entrustments',
    transactions: 'transactions',
    dailyTrade: 'trade/overview',
    longTerm: 'long-term',
    batchLongTerm: 'long-term/batch',
    manage: 'manage',
    manageBatch: 'manage/batch',
    fee: 'fee',
  },
  purchasingPower: {
    tag: 'purchasing-power',
    balanceInquiry: 'balance-inquiry',
  },
  cash: {
    tag: 'cash',
    detail: 'detail',
    delete: 'delete',
    unHold: 'unhold-amount',
  },
  trust: {
    tag: 'trust',
    accounts: 'accounts',
  },
  encryption: {
    tag: 'encryption',
  },
  configuration: {
    tag: 'configuration',
  },
};

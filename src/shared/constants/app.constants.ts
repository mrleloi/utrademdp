export const AppConstant = {
  ApiUrl: {
    watchlists: {
      getWatchlist: '/XQMSvc/GetUserDataRefinitiv',
      setWatchlist: '/XQMSvc/SetUserDataRefinitiv',
    },
    markets: {
      simpleQuote: '/quote/simple',
      mics: '/misc/symbol-ric-map',
    },
    kgi: {
      trust: {
        accounts: '10103004',
      },
      account: {
        queryCustomerById: '25900000',
        statement: '22003200',
        nonTradingData: '22003202',
      },
      positionQuery: {
        inventory: '23130005',
        positionQuery: '23603200',
        positionDetail: '24003004',
        dailyPnL: '24003000',
        dailyPnLDetail: '24003002',
        dailyExchangeRate: '20003200',
      },
      profitsAndLosses: {
        releasePnL: '24100004',
        releasePnLDetail: '24100006',
      },
      orders: {
        dailyTradeOverview: '21120006',
        longTermOrders: '21110006',
        placeLongTermOrders: '3013000A',
        manageOrder: '30130004',
      },
      transactionQuery: {
        getOrderEntrustment: '21110004',
        getOrderTransactions: '21120004',
        stockFee: '24100002',
      },
      purchasingPower: {
        accountStatement: '24500006',
        accoutnBalanceInquiry: '24500008',
      },
      cash: {
        add: '24130009',
        query: '50004002',
        delete: '2413000A',
        detail: '50004006',
        holdAmount: '24130008',
      },
    },
  },
  secureVariable: ['password'],
  RoutesLogLevel: {
    IGNORE: [],
  },
  LogLevel: {
    NONE: '0',
    FULL: '1',
  },
};

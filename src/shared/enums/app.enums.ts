export enum UserTypes {
  PROFESSIONAL = 'professional',
  NONPROFESSIONAL = 'non-professional',
}

export enum OrderChannels {
  AG = 'AG',
  SV = 'SV',
  CH = 'CH',
  AP = 'AP',
  MJ = 'MJ',
  XT = 'XT',
  CW = 'CW',
  BT = 'BT',
  MM = 'MM',
  WM = 'WM',
  ES = 'ES',
  H5 = 'H5',
  RU = 'RU',
}

export enum Markets {
  ALL = '',
  HK = 'HK',
  US = 'US',
  SH = 'SH',
  JP = 'JP',
  TH = 'TH',
  KR = 'KR',
  GB = 'GB',
  FR = 'FR',
  DE = 'DE',
}

export enum TradeTypes {
  Buy = 'B',
  Sell = 'S',
}

export enum SettleCurrency {
  ForeignCurrency = 'MUT',
  TaiwanDollar = 'TWD',
}

export enum TradeKind {
  All = 0,
  WholeSharesTransaction = 1,
  MarginFinancing = 2,
  RegularInvestmentPlanOrStock = 4,
}

export enum Currencies {
  USD = 'USD',
  HKD = 'HKD',
  JPY = 'JPY',
  THB = 'THB',
  SGD = 'SGD',
  KRW = 'KRW',
  EUR = 'EUR',
  GBP = 'GBP',
  CNY = 'CNY',
  AUD = 'AUD',
  NZD = 'NZD',
  ZAR = 'ZAR',
}

export enum LongTermOrderStatus {
  Invalid,
  Valid,
  All,
}

export enum ExecuteStatusCode {
  UNFILLED,
  PARTIALLY_FILLED,
  FILLED,
  ABNORMAL_TRANSACTION,
}

export enum OrderMethods {
  IN_PERSON,
  IN_WRITTEN_FROM,
  TELPHONE,
  INTERNET,
  OTHER,
}

export enum QueryTypes {
  All,
  WholeShareBuyOrSell,
  MarginTrading,
  RegularInvestmentPlanOrShares,
}

export enum OrderTypes {
  LimitOrder = 'LMT',
  LimitOrderOpen = 'LOO',
  LimitOrderClose = 'LOC',
  StopLossOrder = 'SL',
  MarketOrder = 'MKT',
  MarketOrderOpen = 'MOO',
  MarketOrderClose = 'MOC',
}

export enum Phares {
  All = '0',
  Pharse1 = '1',
  Pharse2 = '2',
}

export enum MsgTypes {
  Add = 'ADD',
  Delete = 'DEL',
  Modify = 'MOD',
}

export enum DeviceTypes {
  Android = 'A',
  IOS = 'I',
}

export enum ProdTypes {
  ALL = '',
  EQTY = 'EQTY',
  FUND = 'FUND',
  DEBT = 'DEBT',
}

export enum SrcTypes {
  ALL = '',
  ALPHA = 'ALP',
}

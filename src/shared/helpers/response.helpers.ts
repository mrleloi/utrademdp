import { isObject } from 'class-validator';
import { MarketsService } from '../markets/markets.service';

const addRic = (item: any, mapping: any) =>
  isObject(item) && item['SYMBOL'] && item['MARKET']
    ? { ...item, ric: mapping[`${item['SYMBOL']}_${item['MARKET']}`] ?? '' }
    : item;

const containsSymbolAndMarket = (array: any[]) =>
  array.some((item: any) => isObject(item) && item['SYMBOL'] && item['MARKET']);

const processResponse = async (
  market: MarketsService,
  token: any,
  data: any[],
) => {
  const stocks = data.map((e) => `${e['SYMBOL']}_${e['MARKET']}`);
  const mapping = await market.getRicsFormSymbols({ token }, stocks);
  return mapping.status === 0 ? data.map((e) => addRic(e, mapping.data)) : data;
};

export const addingRicToResponse = async (
  market: MarketsService,
  token: any,
  response: any,
) => {
  try {
    if (!token) return response;

    if (Array.isArray(response)) {
      return containsSymbolAndMarket(response)
        ? await processResponse(market, token, response)
        : response;
    }

    if (Array.isArray(response?.datas)) {
      return containsSymbolAndMarket(response.datas)
        ? {
            ...response,
            datas: await processResponse(market, token, response.datas),
          }
        : response;
    }

    if (Array.isArray(response?.records)) {
      return containsSymbolAndMarket(response.records)
        ? {
            ...response,
            records: await processResponse(market, token, response.records),
          }
        : response;
    }
    return response;
  } catch (_) {
    return response;
  }
};

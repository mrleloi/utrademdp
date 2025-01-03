// eslint-disable-next-line @typescript-eslint/no-var-requires
const OpenCC = require('opencc-js');
import {
  WatchlistDto,
  WatchlistXML,
} from '@modules/watchlists/dtos/request.dto';
import { BadRequestException } from '@nestjs/common';
import * as convert from 'xml-js';

export function convertXmlToJson(xml: string) {
  const response = JSON.parse(
    convert.xml2json(xml.trim(), {
      compact: true,
    }),
  );
  if (response.Result?.Err) {
    throw new BadRequestException('Invalid arg');
  }

  return removeAttributes(response);
}

const removeAttributes = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeAttributes(item));
  } else if (typeof obj === 'object' && obj !== null) {
    let newObj = {};
    for (const key in obj) {
      if (key === '_attributes') {
        newObj = { ...obj[key] };
      } else {
        newObj[key] = removeAttributes(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};

export function convertJsonToXml(xml: WatchlistXML) {
  const convertedJson = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'utf-8',
      },
    },
    Result: {
      SymbolList: {
        _attributes: {
          Version: xml.version,
          ...createAttributes(xml, ['ver', 'defaultIdx']),
        },
        List: xml.watchlists.map((watchlist: WatchlistDto) => ({
          _attributes: {
            ID: watchlist.id,
            ...createAttributes(watchlist, [
              'name',
              'flag',
              'sortIdx',
              'version',
              'value',
            ]),
            ...(watchlist.delete ? { Delete: '1' } : {}),
            Value: watchlist.value || '',
          },
        })),
      },
    },
  };

  return convert.json2xml(JSON.stringify(convertedJson), { compact: true });
}

const createAttributes = (obj: any, keys: string[]) =>
  keys.reduce(
    (acc, key) =>
      obj[key]
        ? { ...acc, [key.charAt(0).toUpperCase() + key.slice(1)]: obj[key] }
        : acc,
    {},
  );

const isSimplifiedChinese = (char: string) => {
  const simplifiedChineseRegex = /[\u3400-\u4DBF\u4E00-\u9FFF]/;
  return simplifiedChineseRegex.test(char);
};

export const convertSimplifiedChineseToTraditionalChinese = (text: string) => {
  let result = '';
  const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

  for (const char of text) {
    if (!isSimplifiedChinese(char)) {
      result += char;
    } else {
      const convertedChar = converter(char);
      result += convertedChar;
    }
  }

  return result;
};

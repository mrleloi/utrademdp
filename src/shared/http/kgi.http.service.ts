import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import config from '@config/app.config';
import { kgiConfig, kgiTrustConfig } from '@config/kgi.config';
import { generateRandomString } from '../helpers/random';

@Injectable()
export class HttpKGIService {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: config.axios.timeout,
    });
  }

  public postOrder = async (id: string, headers: any, data: any) => {
    try {
      delete headers.host;
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: JSON.stringify({
          Header: {
            ...kgiConfig,
            SessionID: generateRandomString(),
            FunctionID: id,
            Account: `I${data['id']}`,
            ClientIP: `${data['orderList'][0]['IP']}`,
          },
          Body: data,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await response.json();
      if (response.status != 200) {
        throw new HttpException(res['Body']['msg'], 400);
      } else {
        if (
          res['Header'] &&
          res['Header']['StatusCode'] == '0' &&
          res['Body'] &&
          res['Body']['rtnCode'] == '0000'
        ) {
          return res['Body'];
        }
        throw new HttpException(res['Body']['msg'], 400);
      }
    } catch (error) {
      const statusCode = error.status ?? 400;
      throw new HttpException(`${id}: ${error?.message}`, statusCode);
    }
  };

  public post = async (id: string, headers: any, data: any) => {
    try {
      delete headers.host;
      const response = await this.axiosInstance.post(
        '',
        (data['ID'] || data['id']) && (data['IP'] || data['orderList'][0]['IP'])
          ? {
              Header: {
                ...kgiConfig,
                SessionID: generateRandomString(),
                FunctionID: id,
                Account: `I${data['ID'] ?? data['id']}`,
                ClientIP: `${data['IP'] ?? data['orderList'][0]['IP']}`,
              },
              Body: data,
            }
          : data,
        { headers },
      );

      if (
        response.data['Header'] &&
        response.data['Header']['StatusCode'] == '0'
      ) {
        if (response.data['Body']['ERR_CODE'] != '0') {
          throw new HttpException(response.data['Body']['ERR_MSG'], 400);
        }
        return response.data['Body'];
      } else if (
        response.data['rtnCode'] == '0000' ||
        response.data['ERR_CODE'] == '0'
      ) {
        return response;
      }
      throw new HttpException(
        response.data['ERR_MSG'] || response.data['msg'],
        400,
      );
    } catch (error) {
      const statusCode = error.status ?? 400;
      throw new HttpException(`${id}: ${error?.message}`, statusCode);
    }
  };

  public postTrust = async (id: string, headers: any, data: any) => {
    try {
      delete headers.host;
      const response = await this.axiosInstance.post(
        '',
        {
          Header: {
            ...kgiTrustConfig,
            SessionID: generateRandomString(),
            FunctionID: id,
            Account: `I${data['id']}`,
            ClientIP: `${data['ip']}`,
          },
          Body: data,
        },
        { headers: {} },
      );

      if (
        response.data['Header'] &&
        response.data['Header']['StatusCode'] == '0'
      ) {
        return response.data['Body'];
      }
      throw new HttpException(response.data['Body'], 400);
    } catch (error) {
      const statusCode = error.status ?? 400;
      throw new HttpException(`${id}: ${error?.message}`, statusCode);
    }
  };
}

import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import config from '@config/app.config';

@Injectable()
export class HttpService {
  private readonly axiosInstance: AxiosInstance;

  constructor(url: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: config.axios.timeout,
    });
  }

  public get = async (url: string, headers: any, params: any = {}) => {
    try {
      delete headers['host'];
      delete headers['x-forwarded-for'];
      const response = await this.axiosInstance.get(url, {
        headers,
        params,
      });
      return response;
    } catch (error) {
      const statusCode = error.response ? error.response.status : null;
      throw new HttpException(url, statusCode, error);
    }
  };

  public post = async (url: string, headers: any, data?: any, params?: any) => {
    try {
      delete headers['host'];
      delete headers['x-forwarded-for'];
      delete headers['content-length'];
      const response = await this.axiosInstance.post(url, data, {
        headers,
        params,
      });
      return response;
    } catch (error) {
      const statusCode = error.response ? error.response.status : null;
      throw new HttpException(url, statusCode, error);
    }
  };
}

import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class BaseHttpService {
  protected readonly axios: AxiosInstance;

  constructor(baseURL: string, timeout: number) {
    this.axios = axios.create({
      baseURL,
      timeout,
      validateStatus: null,
      transformResponse: [
        (data) => {
          return data;
        },
      ],
    });
  }

  async request<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<any> {
    const response = await this.axios.request({
      method,
      url,
      ...config,
      headers: this.sanitizeHeaders(config?.headers || {}),
      responseType: 'text', // Force response as text
    });

    return {
      status: response.status,
      headers: response.headers,
      data: response.data,
    };
  }

  protected sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    delete sanitized['host'];
    delete sanitized['x-forwarded-for'];
    delete sanitized['content-length'];
    return sanitized;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request('GET', url, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request('POST', url, { ...config, data });
  }
}

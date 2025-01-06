import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '@config/app.config';

@Injectable()
export class BaseHttpService {
  protected readonly axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      timeout: config.axios.timeout,
    });
  }

  protected sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    delete sanitized['host'];
    delete sanitized['x-forwarded-for'];
    delete sanitized['content-length'];
    return sanitized;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.get<T>(url, {
        ...config,
        headers: this.sanitizeHeaders(config?.headers || {}),
      });
      return response.data;
    } catch (error) {
      throw new HttpException(error.message, error.response?.status || 500);
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.post<T>(url, data, {
        ...config,
        headers: this.sanitizeHeaders(config?.headers || {}),
      });
      return response.data;
    } catch (error) {
      throw new HttpException(error.message, error.response?.status || 500);
    }
  }
}
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { ApiResponse, ApiError } from '../types/index.js';

export class KeapClient {
  private client: AxiosInstance;
  private accessToken: string;
  private apiKey?: string;
  private baseURL = 'https://api.infusionsoft.com/crm/rest/v1';
  private rateLimitRemaining = 1000;
  private rateLimitReset: number = Date.now();

  constructor(accessToken?: string, apiKey?: string) {
    this.accessToken = accessToken || process.env.KEAP_ACCESS_TOKEN || '';
    this.apiKey = apiKey || process.env.KEAP_API_KEY;

    if (!this.accessToken && !this.apiKey) {
      throw new Error('KEAP_ACCESS_TOKEN or KEAP_API_KEY environment variable is required');
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      // 'fetch' adapter lets this client run on Cloudflare Workers (no XHR / Node http).
      adapter: 'fetch',
      headers: {
        'Content-Type': 'application/json',
        ...(this.accessToken && { 'Authorization': `Bearer ${this.accessToken}` }),
        ...(this.apiKey && { 'X-Keap-API-Key': this.apiKey }),
      },
      timeout: 30000,
    });

    // Response interceptor for rate limiting and error handling
    this.client.interceptors.response.use(
      (response) => {
        // Update rate limit info from headers
        const remaining = response.headers['x-rate-limit-remaining'];
        const reset = response.headers['x-rate-limit-reset'];
        
        if (remaining) this.rateLimitRemaining = parseInt(remaining, 10);
        if (reset) this.rateLimitReset = parseInt(reset, 10) * 1000;

        return response;
      },
      (error) => {
        throw this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 400:
          return new Error(`Bad Request: ${data.message || JSON.stringify(data)}`);
        case 401:
          return new Error('Unauthorized: Invalid or expired access token');
        case 403:
          return new Error('Forbidden: Insufficient permissions');
        case 404:
          return new Error(`Not Found: ${data.message || 'Resource not found'}`);
        case 429:
          return new Error(`Rate Limit Exceeded: Retry after ${this.rateLimitReset}`);
        case 500:
        case 502:
        case 503:
          return new Error(`Keap Server Error (${status}): ${data.message || 'Internal server error'}`);
        default:
          return new Error(`Keap API Error (${status}): ${data.message || JSON.stringify(data)}`);
      }
    } else if (error.request) {
      return new Error('Network Error: No response from Keap API');
    }
    return new Error(`Request Error: ${error.message}`);
  }

  private async checkRateLimit(): Promise<void> {
    if (this.rateLimitRemaining < 10 && Date.now() < this.rateLimitReset) {
      const waitTime = this.rateLimitReset - Date.now();
      console.warn(`Rate limit approaching, waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    await this.checkRateLimit();
    const response = await this.client.request<T>(config);
    return response.data;
  }

  async get<T>(path: string, params?: any): Promise<T> {
    return this.request<T>({ method: 'GET', url: path, params });
  }

  async post<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'POST', url: path, data });
  }

  async put<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', url: path, data });
  }

  async patch<T>(path: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', url: path, data });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url: path });
  }

  // Pagination helper
  async getAllPages<T>(path: string, params: any = {}): Promise<T[]> {
    const results: T[] = [];
    let offset = 0;
    const limit = params.limit || 200;

    while (true) {
      const response = await this.get<ApiResponse<T[]>>(path, { ...params, limit, offset });
      
      if (response.data && response.data.length > 0) {
        results.push(...response.data);
        
        // Check if there are more pages
        if (response.data.length < limit || !response.next) {
          break;
        }
        
        offset += limit;
      } else {
        break;
      }
    }

    return results;
  }

  // V2 API support (some endpoints use v2)
  async requestV2<T>(config: AxiosRequestConfig): Promise<T> {
    const v2Config = {
      ...config,
      baseURL: 'https://api.infusionsoft.com/crm/rest/v2',
    };
    
    await this.checkRateLimit();
    const response = await axios.request<T>({
      ...v2Config,
      adapter: 'fetch',
      headers: {
        'Content-Type': 'application/json',
        ...(this.accessToken && { 'Authorization': `Bearer ${this.accessToken}` }),
        ...(this.apiKey && { 'X-Keap-API-Key': this.apiKey }),
      },
    });
    
    return response.data;
  }

  async getV2<T>(path: string, params?: any): Promise<T> {
    return this.requestV2<T>({ method: 'GET', url: path, params });
  }

  async postV2<T>(path: string, data?: any): Promise<T> {
    return this.requestV2<T>({ method: 'POST', url: path, data });
  }

  async patchV2<T>(path: string, data?: any): Promise<T> {
    return this.requestV2<T>({ method: 'PATCH', url: path, data });
  }

  async deleteV2<T>(path: string): Promise<T> {
    return this.requestV2<T>({ method: 'DELETE', url: path });
  }
}

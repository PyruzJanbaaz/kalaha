import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


@Injectable({
  providedIn: 'root',
})
export class AxiosInterceptorService {

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();

    // Set up request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Modify request config (e.g., add headers)
        config.headers['Authorization'] = 'Bearer your_access_token';
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Set up response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Modify response data or headers if needed
        return response;
      },
      (error: AxiosError) => {
        // Handle response errors (e.g., unauthorized, not found)
        return Promise.reject(error);
      }
    );
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get<T>(url, config).then(response => response.data);
      }
    
      public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post<T>(url, data, config).then(response => response.data);
      }
    
      public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.put<T>(url, data, config).then(response => response.data);
      }
 
}

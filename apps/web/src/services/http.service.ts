import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@bitmetro/auth-react';
import { getEnv } from '../env';

export class HttpService {
  protected httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: getEnv().apiUrl + '/api/v1',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.httpClient.interceptors.request.use(
      config => {
        const accessToken = getAccessToken();

        if (!!accessToken) {
          config.headers!.authentication = `Bearer ${accessToken}`;
        }

        return config;
      },
      console.error
    );
  }
}

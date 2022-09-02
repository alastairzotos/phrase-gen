import axios, { AxiosInstance } from 'axios';
import { getEnv } from '../env';
import { useAuthState } from '../state/auth';

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
        const accessToken = useAuthState.getState().accessToken;

        if (!!accessToken) {
          config.headers!.authentication = `Bearer ${accessToken}`;
        }

        return config;
      },
      console.error
    );
  }
}

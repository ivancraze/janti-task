import http from './axios';
import { IRoute, IRouteData } from '@app/types';
import { AxiosResponse } from 'axios';
export default class RouteDataService {
  static getRoutes(): Promise<AxiosResponse<IRoute[]>> {
    return http.get<IRoute[]>('/GetRoutes');
  }

  static getRouteData(id: number): Promise<AxiosResponse<IRouteData[]>> {
    return http.get<IRouteData[]>(`/GetRouteData?id=${id}`);
  }
}

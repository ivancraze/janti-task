import { SerializedError } from '@reduxjs/toolkit';

export interface IAppState {
  isLoading: boolean;
  error: SerializedError | null;
  routes: IRoute[];
  activeRoute: IRoute | null;
  activeRouteData: IRouteData[];
}

export interface IRoute {
  id: number;
  name: string;
  color: string;
}

export interface IRouteData {
  time: number;
  lon: number;
  lat: number;
  course: number;
  speed: number;
}

export interface ITableColumnsType {
  title: string;
  dataIndex: string;
  key: string;
  className: string;
}

export interface ITableDataType {
  key: number;
  routeId: number;
  routeName: string;
}

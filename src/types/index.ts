export interface IAppState {
  isLoading: boolean;
  error: string | undefined;
  routes: IRoute[];
  activeRoute: IRoute | undefined;
  activeRouteData: IRouteData[];
}

export interface IRoute {
  id: string;
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

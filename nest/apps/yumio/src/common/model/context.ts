// export type IContext =
//   | (IContextHttp & { dataSources: IDataSources })
//   | (IContextSocket & { dataSources: IDataSources });

import { ApiKey } from '@yumio/modules/apiKey/model';

export type IContext = IContextHttp | IContextSocket;

export interface IContextUser {
  id: number;
  name?: string;
}

export interface IContextHttp {
  id: string;
  /** @deprecated in favour of site, dropping soon */
  serviceAreaId: number;
  siteId: number;
  timeZone: string;
  locale: string;
  mock: boolean;
  req: any;
  res?: any;
  user: IContextUser;
  jwt: string;
  deviceId: string;
  firebaseDeviceId: string;
  userSessionId: string;
  apiKey?: string;
  apiKeyDetails?: ApiKey;
  complexity?: number;
}
export interface IContextSocket {
  id: string;
  /** @deprecated  in favour of site, dropping soon */
  serviceAreaId: number;
  siteId: number;
  timeZone: string;
  locale: string;
  mock: boolean;
  req: any;
  res?: null;
  socket?: WebSocket;
  user: IContextUser;
  jwt: string;
  deviceId: string;
  firebaseDeviceId: string;
  userSessionId: string;
  apiKey?: string;
  apiKeyDetails?: ApiKey;
}

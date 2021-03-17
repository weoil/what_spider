import { AxiosInstance, AxiosResponse } from "axios";
import axios, { AxiosRequestConfig } from "axios";

export interface WhatSpiderConfig {
  maxConnection?: number;
  delay?: number; // 等待的毫秒
  retry?: number;
  log?: boolean;
  fetchConfig?: AxiosRequestConfig;
}

export interface fetchConfig extends AxiosRequestConfig {
  meta?: {
    [key: string]: any;
  };
}
export type fetchParams = string | fetchConfig | (fetchConfig | string)[];
export type ruleParams = RegExp | ((url: string) => boolean | Promise<boolean>);

export type parseFn<T> = (
  response: AxiosResponse<T>
) => Promise<AxiosResponse<T>> | AxiosResponse<T>;

export type errorFn = (error: any) => boolean;

export interface spiderParams {
  config?: WhatSpiderConfig;
  rules: ruleParams[];
  parses: parseFn<any>[];
  onError?: errorFn;
}
export interface WhatSpiderConfig {
  maxConnection?: number;
  delay?: number; // 等待的毫秒
  retry?: number;
  fetchConfig?: AxiosRequestConfig;
}

export interface _Params extends spiderParams {
  onError: errorFn;
  config: WhatSpiderConfig;
  io: AxiosInstance;
  connection: number;
  tasks: fetchConfig[];
  parses: parseFn<any>[];
}

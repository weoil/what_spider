import axios from "axios";
import {
  WhatSpiderConfig,
  fetchConfig,
  fetchParams,
  errorFn,
  spiderParams,
  _Params,
} from "./types";

export function defaultConfig(): WhatSpiderConfig {
  return { maxConnection: 0 };
}

export default function Spider(params: spiderParams) {
  const config: WhatSpiderConfig = params.config ?? defaultConfig();
  const onError: errorFn = params.onError ?? ((_) => false);
  const io = axios.create(config.fetchConfig);
  const data: _Params = {
    ...params,
    onError,
    config,
    io,
    connection: 0,
    tasks: [],
  };
  return (url: fetchParams) => {
    Fetch(url, data);
  };
}

function Fetch(url: fetchParams, data: _Params) {
  if (!Array.isArray(url)) {
    url = [url];
  }
  let configList: fetchConfig[] = url.map((_url) => {
    let obj: fetchConfig = {};
    if (typeof _url === "string") {
      obj.url = _url;
    } else {
      obj = _url;
    }
    return obj;
  });
  configList = configList.filter((_config) => {
    return data.rules.some((ex) => {
      const url = _config.url;
      if (!url) return false;
      if (typeof ex === "function") {
        return ex(url);
      }
      return ex.test(url);
    });
  });
  data.tasks = data.tasks.concat(configList);
  goRun(data);
}

function goRun(data: _Params) {
  let configList: fetchConfig[] = [];
  if (data.config.maxConnection === 0 || !data.config.maxConnection) {
    configList = data.tasks;
    data.tasks = [];
  } else if (data.connection < data.config.maxConnection) {
    configList = data.tasks.splice(
      0,
      data.config.maxConnection - data.connection
    );
  }
  configList.forEach((cfg) => {
    data.connection++;
    data
      .io(cfg)
      .then(async (val) => {
        let resp = val;
        for (let parse of data.parses) {
          resp = await parse(resp);
        }
      })
      .catch((err) => {
        const isRetry = data.onError(err);
        if (isRetry && (cfg?.meta?._retry ?? 0) < (data.config.retry ?? 0)) {
          if (!cfg.meta) {
            cfg.meta = {
              _retry: 0,
            };
          }
          cfg.meta._retry = (cfg.meta?.retry ?? 0) + 1;
          Fetch(cfg, data);
        }
      })
      .finally(() => {
        if (data.config.delay) {
        }
        data.connection--;
        goRun(data);
      });
  });
}

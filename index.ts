export * from "./modules/utils";
import axios, { AxiosResponse } from "axios";
import {
  WhatSpiderConfig,
  fetchConfig,
  fetchParams,
  errorFn,
  spiderParams,
  _Params,
} from "./modules/types";
import logger from "loglevel";
import { getLogTime, sleep } from "./modules/utils";
const log = logger.getLogger("what-spider");
log.setLevel(log.levels.DEBUG);

export function defaultConfig(): WhatSpiderConfig {
  return { maxConnection: 0, log: true };
}

export default function Spider(params: spiderParams) {
  const config: WhatSpiderConfig = params.config ?? defaultConfig();
  if (config.log === false) {
    log.disableAll();
  }
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
async function Fetch(url: fetchParams, data: _Params) {
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
  const list = [];
  for (let _config of configList) {
    if (!_config.url) {
      continue;
    }
    let flag = true;
    for (const ex of data.rules) {
      const url = _config.url;
      if (typeof ex === "function") {
        flag = await ex(url);
      } else {
        flag = ex.test(url);
      }
      if (!flag) break;
    }
    if (flag) {
      list.push(_config);
    }
  }
  data.tasks = data.tasks.concat(list);
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
    log.debug(`${getLogTime()}fetch start: ${cfg.url}`);
    data
      .io(cfg)
      .then(async (val) => {
        log.debug(`${getLogTime()}fetch finish: ${cfg.url}`);
        let resp: AxiosResponse | null = val;
        for (let parse of data.parses) {
          if (!resp) return;
          resp = (await parse(cfg.url as string, resp)) || null;
        }
      })
      .catch((err) => {
        log.warn(`${getLogTime()}fetch error: ${cfg.url} \n`, err.message);
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
      .finally(async () => {
        if (data.config.delay) {
          await sleep(data.config.delay);
        }
        data.connection--;
        goRun(data);
      });
  });
}

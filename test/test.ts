import { AxiosResponse } from "axios";
import Spider from "../index";
import { decodeHtml } from "../modules/utils";

const fetch = Spider({
  rules: [/htm_data\/\d+\/\d*\/\d+/, async (url) => false],
  parses: [
    (url, response: AxiosResponse) => {
      console.log(decodeHtml(response.data, "gbk").length);
    },
  ],
  onError(e) {
    console.log(e);
    return false;
  },
  config: {
    fetchConfig: {
      proxy: {
        host: "127.0.0.1",
        port: 2081,
      },
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "upgrade-insecure-requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
      },
    },
  },
});

fetch({
  url: "http://t66y.com/htm_data/2102/7/4362394.html",
  responseType: "arraybuffer",
});

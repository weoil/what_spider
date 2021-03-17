import Iconv from "iconv-lite";
import cron from "cron-parser";

/**
 * 重新编码html
 * fetch() 时 responseType: "arraybuffer"
 * @param {Buffer} buffer
 * @param {string} encoding utf8/gbk ..
 * @returns
 */
export function decodeHtml(buffer: Buffer, encoding: string) {
  return Iconv.decode(buffer, "gbk");
}

export function getLogTime(date: Date = new Date()) {
  return `[ ${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()} ] - `;
}

/**
 * 等待函数
 *
 * @param {number} milliseconds 毫秒
 * @returns {Promise<void>}
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
/**
 * 计划任务
 *
 * @param {string} expression Crontab规则： 秒 分 时 日 月 周
 * @param {(() => void | Promise<void>)} cb 定时执行函数,如果为Promise则会等待执行
 * @param {boolean} [immediate] 是否立即执行
 */
export async function plan(
  expression: string,
  cb: () => void | Promise<void>,
  immediate?: boolean
) {
  if (immediate) {
    await _runTask(0, cb);
  }
  const interval = cron.parseExpression(expression);
  while (true) {
    try {
      const ms = interval.next().getTime() - Date.now();
      if (ms < 0) continue; // 结束时间超过了下次时间，等待下次再执行
      await _runTask(ms, cb);
    } catch (error) {
      break;
    }
  }
}

async function _runTask(milliseconds: number, cb: () => void | Promise<void>) {
  await sleep(milliseconds);
  try {
    await cb();
  } catch (_) {}
}

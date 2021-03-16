import Iconv from "iconv-lite";

// 重新编码html
// fetch() 时 responseType: "arraybuffer"
export function decodeHtml(buffer: Buffer, encoding: string) {
  return Iconv.decode(buffer, "gbk");
}

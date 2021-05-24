import fs from 'fs';
import path from 'path';

export const getParams = (fileName) => {
  const filePath = path.resolve(process.cwd(), `src/crawler/data/123.json`);
  if (!fs.existsSync(filePath)) throw '文件不存在';
  return fs.readFileSync(filePath);
}

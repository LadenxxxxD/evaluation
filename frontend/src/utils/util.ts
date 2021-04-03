import moment from 'moment';

export const formatTimestampDate = (timestamp: string | number, fix: string = '-'): string => {
  if (!timestamp) return '';
  let timestampNumber = Number(timestamp);
  if (timestampNumber < 9999999999) {
    timestampNumber *= 1000; // 秒时间戳转毫秒时间戳
  }
  return moment(timestampNumber).format(`YYYY${fix}MM${fix}DD`)
}

export const formatTimestampSecond = (timestamp: string | number, fix: string = '-') => {
  if (!timestamp) return '';
  let timestampNumber = Number(timestamp);
  if (timestampNumber < 9999999999) {
    timestampNumber *= 1000; // 秒时间戳转毫秒时间戳
  }
  return moment(timestamp).format(`YYYY${fix}MM${fix}DD hh${fix}mm${fix}ss`)
}
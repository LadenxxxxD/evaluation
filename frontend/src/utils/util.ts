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

export const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin

import 'dayjs/locale/en-gb'; // import locale

dayjs.extend(isLeapYear); // use plugin
dayjs.locale('en-gb'); // use locale

export const timeout = (ms: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise(resolve => setTimeout(resolve, ms));

export const makeId = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const formatDate = (date: string, format: string = 'DD-MM-YYYY') => {
  return dayjs(date).format(format);
};

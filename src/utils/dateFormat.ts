import dayjs from 'dayjs';

export const dateFormat = {
  /**
   * @returns YYYY.MM.DD
   */
  date1: (value: string) => {
    if (!value) throw new Error('value값이 없습니다!');
    return dayjs(value).format('YYYY.MM.DD');
  },
  /**
   * @returns 'YYYY.MM.DD HH:mm
   */
  date2: (value: string | null) => {
    if (!value) throw new Error('value값이 없습니다!');
    return dayjs(value).format('YYYY.MM.DD HH:mm');
  },
  /**
   * @returns YYYY.MM.DD HH:mm:ss
   */
  date3: (value: string | null) => {
    if (!value) throw new Error('value값이 없습니다!');
    return dayjs(value).format('YYYY.MM.DD HH:mm:ss');
  },
  /**
   * @returns MM/DD/YYYY
   */
  date4: (value: string | null) => {
    if (!value) throw new Error('value값이 없습니다!');
    return dayjs(value).format('MM/DD/YYYY');
  },
  /**
   * @returns YYYY-MM-DD
   */
  date5: (value: string | null) => {
    if (!value) throw new Error('value값이 없습니다!');
    return dayjs(value).format('YYYY-MM-DD');
  },
  /**
   * @returns Today's YYYY-MM-DD
   */
  today: () => dayjs(new Date()).format('YYYY-MM-DD'),
  /**
   * @returns 1주일전 YYYY-MM-DD
   */
  oneWeekAgo: () => dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
  /**
   * @returns 1달전 YYYY-MM-DD
   */
  oneMonthAgo: () => dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
  /**
   * @returns 3달전 YYYY-MM-DD
   */
  threeMonthsAgo: () => dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
  /**
   * @returns 6달전 YYYY-MM-DD
   */
  sixMonthsAgo: () => dayjs().subtract(6, 'months').format('YYYY-MM-DD'),
  /**
   * @returns 12달전 YYYY-MM-DD
   */
  oneYearsAgo: () => dayjs().subtract(12, 'months').format('YYYY-MM-DD'),
  /**
   * @returns n일 후 YYYY-MM-DD
   */
  daysAfter: (value: string, days: number) => dayjs(value).add(days, 'days').format('YYYY-MM-DD'),
};

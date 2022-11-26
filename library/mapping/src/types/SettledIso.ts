export interface SettledIso<T = any> {
  fulfilled: null | T;
  rejected: any;
  status: 'rejected' | 'fulfilled';
  value?: undefined | T;
  reason?: any;
  index: number;
}

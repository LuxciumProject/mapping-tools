 export type Settled<T = unknown> = (SettledLeft | SettledRight<T>)

export interface SettledRight<T> extends PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
  reason?: undefined;
  fulfilled: T;
  rejected: null;
  index: number;
}
export interface SettledLeft extends PromiseRejectedResult {
  status: 'rejected';
  reason: any;
  value?: undefined;
  rejected: any;
  fulfilled: null;
  index: number;
}

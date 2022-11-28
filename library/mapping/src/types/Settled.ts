/** @alpha */
export type SettledResult<T = unknown> = PromiseSettledResult<T>;
/** @alpha */
export type FulfilledResult<T = unknown> = PromiseFulfilledResult<T>;
/** @alpha */
export type RejectedResult = PromiseRejectedResult;

/** @alpha */
export type Settled<T = unknown> = SettledLeft | SettledRight<T>;

/** @alpha */
export interface SettledRight<T> extends PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
  reason?: undefined;
  fulfilled: T;
  rejected: null;
  recipeSteps: number;
  currentRejection: null;
  index: number;
}
/** @alpha */
export interface SettledLeft extends PromiseRejectedResult {
  status: 'rejected';
  reason: any;
  value?: undefined;
  rejected: any;
  fulfilled: null;
  recipeSteps: number;
  currentRejection: true | false | undefined;
  index: number;
}

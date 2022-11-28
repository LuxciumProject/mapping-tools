import { Mapper, OnlySideEffect, Settled } from '.';

/** @public */
export type TransformFn<T, U> = Mapper<T, Promise<U>, T | Settled<T>>;
/** @public */
export type LookupFn<U> = (value: U, index: number) => OnlySideEffect;
/** @public */
export type ValidateFn<U> = (
  value: U,
  index: number
) => Promise<OnlySideEffect>;
/** @public */
export type ErrLookupFn = (
  reason: unknown,
  index: number,
  currentRejection: boolean
) => OnlySideEffect;

/** @public */
export interface MapperOptions<T, U> {
  item: T | Settled<T>;
  index: number;
  array?: (T | Settled<T>)[];
  transform: TransformFn<T, U>;
  lookup?: LookupFn<U>;
  validate?: ValidateFn<U>;
  errLookup?: ErrLookupFn;
}

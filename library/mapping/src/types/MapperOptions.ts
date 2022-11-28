import { Mapper, OnlySideEffect, Settled } from '.';

/** @alpha */
export type TransformFn<T, U> = Mapper<T, Promise<U>, T | Settled<T>>;
/** @alpha */
export type LookupFn<U> = (value: U, index: number) => OnlySideEffect;
/** @alpha */
export type ValidateFn<U> = (
  value: U,
  index: number
) => Promise<OnlySideEffect>;
/** @alpha */
export type ErrLookupFn = (
  reason: unknown,
  index: number,
  currentRejection: boolean
) => OnlySideEffect;

/** @alpha */
export interface MapperOptions<T, U> {
  item: T | Settled<T>;
  index: number;
  array?: (T | Settled<T>)[];
  transform: TransformFn<T, U>;
  lookup?: LookupFn<U>;
  validate?: ValidateFn<U>;
  errLookup?: ErrLookupFn;
}

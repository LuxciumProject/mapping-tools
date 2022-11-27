import { Mapper, OnlySideEffect, Settled } from '.';

export type TransformFn<T, U> = Mapper<T, Promise<U>, T | Settled<T>>;
export type LookupFn<U> = (value: U, index: number) => OnlySideEffect;
export type ValidateFn<U> = (
  value: U,
  index: number
) => Promise<OnlySideEffect>;
export type ErrLookupFn = (
  reason: unknown,
  index: number,
  current: boolean
) => OnlySideEffect;

export interface MapperOptions<T, U> {
  item: T | Settled<T>;
  index: number;
  array?: (T | Settled<T>)[];
  transform: TransformFn<T, U>;
  lookup?: LookupFn<U>;
  validate?: ValidateFn<U>;
  errLookup?: ErrLookupFn;
}

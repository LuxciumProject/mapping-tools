import type { Settled, SettledLeft, SettledRight } from '.';

export type AwaitableTypes<T> =
  | PromiseLike<Iterable<PromiseFulfilledResult<T>>>
  | PromiseLike<Iterable<PromiseLike<PromiseFulfilledResult<T>>>>
  | PromiseLike<Iterable<PromiseLike<PromiseRejectedResult>>>
  | PromiseLike<Iterable<PromiseLike<SettledLeft>>>
  | PromiseLike<Iterable<PromiseLike<SettledRight<T>>>>
  | PromiseLike<Iterable<PromiseLike<T>>>
  | PromiseLike<Iterable<PromiseRejectedResult>>
  | PromiseLike<Iterable<SettledLeft>>
  | PromiseLike<Iterable<SettledRight<T>>>
  | PromiseLike<Iterable<T>>
  | PromiseLike<PromiseFulfilledResult<T>>
  | PromiseLike<PromiseRejectedResult>
  | PromiseLike<SettledLeft>
  | PromiseLike<SettledRight<T>>
  | PromiseLike<T>;

export type BaseType2<T> =
  | PromiseFulfilledResult<T>
  | PromiseLike<PromiseFulfilledResult<T>>
  | PromiseLike<PromiseRejectedResult>
  | PromiseLike<SettledLeft>
  | PromiseLike<SettledRight<T>>
  | PromiseLike<T>
  | PromiseRejectedResult
  | PromiseSettledResult<T>
  | Settled<T>
  | SettledLeft
  | SettledRight<T>
  | T;
export type BaseType<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult
  | PromiseSettledResult<T>
  | Settled<T>
  | SettledLeft
  | SettledRight<T>
  | T;

export type CollectionType<T> = Iterable<BaseType<T>>;
export type AwaitIterablesTypes<T> = Iterable<PromiseLike<BaseType<T>>>;
export type AwaitableTypes_<T> = PromiseLike<
  AwaitIterablesTypes<T> | BaseType<T> | CollectionType<T>
>;

// | Iterable<T>
// | Iterable<SettledRight<T>>
// | Iterable<PromiseFulfilledResult<T>>
// | Iterable<SettledLeft>
// | Iterable<PromiseRejectedResult>;

// | Iterable<PromiseLike<T>>
// | Iterable<PromiseLike<SettledRight<T>>>
// | Iterable<PromiseLike<PromiseFulfilledResult<T>>>
// | Iterable<PromiseLike<SettledLeft>>
// | Iterable<PromiseLike<PromiseRejectedResult>>;

// TASK LIST: [TODO: Types] (Review Documentation) -------------------

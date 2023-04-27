import type {
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';
/**
 * ### parallelMapping
 ***`parallelMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Array<Promise<Settled<R>>>`**
 * Applies the provided callback functions to each item in the
 * collection in parallel, and returns an array of promises that
 * resolve to the transformed and validated items, represented as
 * `Settled<R>` objects.
 * - Based on an `Array.prototype.map($)`
 * - Function signature:
 *   ```typescript
 *   export function parallelMapping<T, R>(
 *     collection: Collection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): Promise<Settled<R>>[];
 *   ```
 * - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
 * - Returns: `Array<Promise<Settled<R>>>`
 * @group Core Functions
 */
export function parallelMapping<T, R>(
  collection: Collection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): Promise<Settled<R>>[] {
  return [...collection].map(async (item, index, array) =>
    fn_a1f9a({
      item,
      index,
      array,
      transform:
        null == transformFn ? async value => value as any as R : transformFn,
      lookup: null == lookupFn ? v => void v : lookupFn,
      validate: null == validateFn ? async v => void v : validateFn,
      errLookup: null == errLookupFn ? v => void v : errLookupFn,
    })
  );
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;
export type OfBase<BASE> = BASE extends Settled<infer B>
  ? B extends SettledRight<infer BVal>
    ? BVal
    : never
  : BASE extends PromiseSettledResult<infer B>
  ? B extends PromiseFulfilledResult<infer BVal>
    ? BVal
    : never
  : BASE;
export type OfDeferred<TVal> = TVal extends PromiseLike<infer BASE>
  ? BASE extends Base<infer B>
    ? B
    : never
  : never;

// export type OfIterable<TVal> =
// TVal extends Iterable<infer DBase>
//   ? DBase extends PromiseLike<infer BASE>
//     ? BASE extends Base<infer B> ? B
//     : never: DBase extends Base<infer B> ? B
//     : never;
export type Deferred<B> = PromiseLike<Base<B>>;
export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;
export type MyType<B> = Base<B> | Deferred<B>;

// PromiseLike<Base<B>>
parallelMapping([]);
['', ''];
export const aVal_001 = 14;
export const aVal_002 = 14;
export const aVal_003 = 14;
export const aVal_004 = 14;
export const aVal_005 = 14;

/*

const myArray: Array<Promise<string>> = [
  Promise.resolve('foo'),
  Promise.reject('bar'),
];
myArray;

export type Nested<T> = T extends Deferred<infer U> ? (U extends Base<infer V> ? (V extends Settled<infer S0> ? (S0 extends SettledRight<infer S1>?  S1 : never) : V extends PromiseSettledResult<infer S2> ?  (S2 extends PromiseFulfilledResult<infer S3> ? S3 : never)) : U ) :  T extends Nested<U>

 T extends Deferred<infer U> ? (U extends Base<infer V> ? (V extends Settled<infer S0> ? (S0 extends SettledRight<infer S1>?  S1 : never) : V extends PromiseSettledResult<infer S2> ?  (S2 extends PromiseFulfilledResult<infer S3> ? S3 : never)) : U ) : Nested<U>

 Deferred<B> ? Nested<B> | Base<B>
   Settled<TVal>
   PromiseSettledResult<TVal>
   SettledRight<TVal>
   PromiseFulfilledResult<TVal>
   SettledLeft
   PromiseRejectedResult;

Base<infer V> ?
   V extends Settled<infer S0> ?
   S0 extends SettledRight<infer S1> ? S1 : never :
   V extends PromiseSettledResult<infer S2> ?
   S2 extends PromiseFulfilledResult<infer S3> ? S3 : never : V
extends Base<infer V>
    ? Nested<V>
    : U extends Base<infer W>
    ? Nested<W>
    : never
  : T;
*/

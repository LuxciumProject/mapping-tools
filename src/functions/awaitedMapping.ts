import { isPromiseLike } from '../helpers/assertions';
import {
  DeferredCollection,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';
/**
 *
 *### awaitedMapping
 *
 ***`awaitedMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Promise<Array<Settled<R>>>`**
 *
 *Applies the provided callback functions to each item in the collection, and returns a promise that resolves to an array of the transformed and validated items, represented as `Settled<R>` objects.
 *- Based on `Promise.all($)`
 *- Function signature:
 *  ```typescript
 *  export async function awaitedMapping<T, R>(
 *    collection: DeferredCollection<T>,
 *    transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *    lookupFn: LookupFn<T, R> | null = v => void v,
 *    validateFn: ValidateFn<T, R> | null = async v => void v,
 *    errLookupFn: ErrLookupFn | null = v => void v
 *  ): Promise<Settled<R>[]>;
 *  ```
 *- Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
 *- Returns: `Promise<Array<Settled<R>>>`
 * @group Core Functions
 */
export async function awaitedMapping<T, R>(
  collection: DeferredCollection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): Promise<Settled<R>[]> {
  const values = [
    ...(isPromiseLike(collection) ? await collection : collection),
  ];
  const result = values.map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      array,
      transform:
        transformFn == null ? async value => value as any as R : transformFn,
      lookup: lookupFn == null ? v => void v : lookupFn,
      validate: validateFn == null ? async v => void v : validateFn,
      errLookup: errLookupFn == null ? v => void v : errLookupFn,
    })
  );
  return Promise.all(result);
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

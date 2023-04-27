import { isPromiseLike } from '../helpers/assertions';
import {
  DeferredCollection,
  ErrLookupFn,
  LookupFn,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';
/**
 * ### generateMappingAsync
 * **`generateMappingAsync(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): AsyncGenerator<Settled<R>, void, unknown>`**
 * Applies the provided callback functions to each item in the collection, and returns an async generator that yields the transformed and validated items, represented as `Settled<R>` objects.
 * - Based on the `AsyncGenerator` _Protocol_
 * - Function signature:
 *   ```typescript
 *   export async function* generateMappingAsync<R, T>(
 *     collection: DeferredCollection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): AsyncGenerator<Settled<R>, void, unknown>;
 *   ```
 * - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
 * - Returns: `AsyncGenerator<Settled<R>, void, unknown>`
 * @group Core Functions
 */
export async function* generateMappingAsync<R, T>(
  collection: DeferredCollection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): AsyncGenerator<SettledLeft | SettledRight<R>, void, unknown> {
  const values = [
    ...(isPromiseLike(collection) ? await collection : collection),
  ];
  let index = 0;
  for await (const item of values) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...values],
      transform:
        null == transformFn ? async value => value as any as R : transformFn,
      lookup: null == lookupFn ? v => void v : lookupFn,
      validate: null == validateFn ? async v => void v : validateFn,
      errLookup: null == errLookupFn ? v => void v : errLookupFn,
    });
  }
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

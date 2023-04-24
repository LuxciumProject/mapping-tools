import {
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';
/**
 *
 * ### generateMapping
 * **`generateMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Generator<Promise<Settled<R>>, void, unknown>`**
 *
 * Applies the provided callback functions to each item in the collection, and returns a generator that yields promises that resolve to the transformed and validated items, represented as `Settled<R>` objects.
 * - Based on the `Generator` _Protocol_
 * - Function signature:
 *   ```typescript
 *   export function* generateMapping<T, R>(
 *     collection: Collection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): Generator<Promise<Settled<R>>, void, unknown>;
 *   ```
 * - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
 * - Returns: `Generator<Promise<Settled<R>>, void, unknown>`
 * @group Core Functions
 */
export function* generateMapping<T, R>(
  collection: Collection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): Generator<Promise<Settled<R>>, void, unknown> {
  let index = 0;
  for (const item of collection) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...collection],
      transform:
        transformFn == null ? async value => value as any as R : transformFn,
      lookup: lookupFn == null ? v => void v : lookupFn,
      validate: validateFn == null ? async v => void v : validateFn,
      errLookup: errLookupFn == null ? v => void v : errLookupFn,
    });
  }
}

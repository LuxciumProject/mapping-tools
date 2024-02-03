import type {
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
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

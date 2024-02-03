import type { Settled } from '../types';
import { makeFulfillement } from './core/makeFulfillement';

function syncMapping<T, R>(
  collection: T[],
  transformFnSync: TransformFnSync<T, R>
): Settled<R>[] {
  return collection.map((value, index) =>
    makeFulfillement<R>({
      value: transformFnSync(value, index, collection),
      index,
    })
  );
}

export default syncMapping;

export type TransformFnSync<T, U = unknown> = (
  value: T,
  index: number,
  array: readonly (PromiseSettledResult<T> | T)[]
) => U;

/*
export  function serialMapping<T, R>(
  collection: DeferredCollection<T>,
  transformFn: TransformFn<T, R> | null =  value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null =  v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): Settled<R>[] {
 */

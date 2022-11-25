import { OnlySideEffect } from '../types/mapping/OnlySideEffect';
import { FULFILLED, REJECTED } from './constants';

export async function serialMapping_α<R, T>(
  collection: Iterable<T>,
  transform: (item: T) => Promise<R>,
  lookup: (value: R) => OnlySideEffect = v => void v,
  validate: (value: R) => Promise<OnlySideEffect> = async v => void v,
  errLookup: (error: unknown) => OnlySideEffect = v => void v
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = [];
  for (const item of collection) {
    try {
      const value = await transform(item);
      lookup(value);
      await validate(value);
      results.push({ status: FULFILLED, value });
    } catch (error) {
      errLookup(error);
      results.push({ status: REJECTED, reason: error });
    }
  }
  return results;
}

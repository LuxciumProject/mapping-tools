import { OnlySideEffect } from '../types/mapping/OnlySideEffect';
import { FULFILLED, REJECTED } from './constants';

export function paralellMapping_ς<R, T>(
  collection: T[],
  transform: (item: T) => Promise<R>,
  lookup: (value: R) => OnlySideEffect = v => void v,
  validate: (value: R) => Promise<OnlySideEffect> = async v => void v,
  errLookup: (error: unknown) => OnlySideEffect = v => void v
): Promise<PromiseSettledResult<R>>[] {
  return collection.map(async item => {
    try {
      const value = await transform(item);
      lookup(value);
      await validate(value);
      return { status: FULFILLED, value };
    } catch (error) {
      errLookup(error);
      return { status: REJECTED, reason: error };
    }
  });
}

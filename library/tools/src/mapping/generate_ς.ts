import { FULFILLED, REJECTED } from './constants';

export function* generate_ς<R, T>(
  collection: Iterable<T>,
  transform: (item: T) => Promise<R>
): Generator<PromiseSettledResult<Promise<R>>, void, unknown> {
  for (const item of collection) {
    try {
      const value = transform(item);
      yield { status: FULFILLED, value };
    } catch (error) {
      yield { status: REJECTED, reason: error };
    }
  }
}

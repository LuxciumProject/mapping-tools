import { Mapper } from '../types';
import { FULFILLED, REJECTED } from './constants';

export async function* asyncGenerate_α<R, T>(
  collection: Iterable<T>,
  transform: Mapper<T, Promise<R>> // (item: T) => Promise<R>
): AsyncGenerator<PromiseSettledResult<R>, void, unknown> {
  let i = 0;
  for await (const item of collection) {
    try {
      const value = await transform(item, i++, [...collection]);
      yield { status: FULFILLED, value };
    } catch (error) {
      yield { status: REJECTED, reason: error };
    }
  }
}

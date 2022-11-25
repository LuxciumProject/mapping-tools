import { FULFILLED, REJECTED } from './constants';

export async function* asyncGenerate_α<R, T>(
  collection: Iterable<T>,
  transform: (item: T) => Promise<R>
): AsyncGenerator<PromiseSettledResult<R>, void, unknown> {
  for await (const item of collection) {
    try {
      const value = await transform(item);
      yield { status: FULFILLED, value };
    } catch (error) {
      yield { status: REJECTED, reason: error };
    }
  }
}

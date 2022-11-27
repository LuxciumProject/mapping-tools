import { Settled, TransformFn } from '../types';
import { fn_a1f9a } from './fn_a1f9a';

export async function* generateMappingAsync_α<R, T>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R>
): AsyncGenerator<PromiseSettledResult<R>, void, unknown> {
  let index = 0;
  for await (const item of collection) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...collection],
      transform,
    });
  }
}

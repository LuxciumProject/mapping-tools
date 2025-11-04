/* istanbul ignore file */
import { Chain } from './Chain';

export { Chain };
export {
  addFirstFunction,
  ChainTranformFunctions,
} from './ChainTranformFunctions';

/**
 * Convenience factory function to create a Chain from a collection.
 * Provides a fluent, chainable API for mapping operations.
 *
 * @example
 * ```typescript
 * import { chain } from 'mapping-tools';
 *
 * const result = await chain([1, 2, 3, 4, 5])
 *   .awaitedMapping(async x => x * 2)
 *   .awaitedMapping(async x => x + 1)
 *   .getValues();
 * // result: [3, 5, 7, 9, 11]
 * ```
 *
 * @param collection - An iterable collection or a promise of a collection
 * @returns A new Chain instance wrapping the collection
 * @public
 */
export function chain<T>(
  collection: Iterable<T> | PromiseLike<Iterable<T>>
): Chain<T> {
  return Chain.of(collection);
}

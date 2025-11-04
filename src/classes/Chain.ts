/* istanbul ignore file */
import type { NULL_SYMBOL } from '..';
import {
  awaitedMapping,
  generateMapping,
  generateMappingAsync,
  parallelMapping,
  serialMapping,
} from '../functions';
import { isSettled } from '../helpers/assertions';
import {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
} from '../helpers/tools';
import type {
  BaseOrDeferred,
  Collection,
  ErrLookupFn,
  IChain,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';

/* istambul ignore next */
/**
 * A fluent, chainable API wrapper for mapping-tools functions.
 * Provides a convenient way to chain transformations on collections.
 *
 * @example
 * ```typescript
 * // Using the static factory method
 * const result = await Chain.of([1, 2, 3, 4, 5])
 *   .awaitedMapping(async x => x * 2)
 *   .awaitedMapping(async x => x + 1)
 *   .getValues();
 * // result: [3, 5, 7, 9, 11]
 * ```
 *
 * @example
 * ```typescript
 * // Using the chain helper function
 * import { chain } from 'mapping-tools';
 * const result = await chain([1, 2, 3])
 *   .serialMapping(async x => x * 2)
 *   .toArray();
 * ```
 *
 * @typeParam B - The type of elements in the collection
 * @public
 * @beta
 */
/* istambul ignore next */
export class Chain<B> implements IChain<B> {
  collection: Collection<B> | PromiseLike<Collection<B>>;

  private readonly _list: Promise<BaseOrDeferred<B>[]>;

  /**
   * Static factory method to create a new Chain from a collection.
   *
   * @param collection - An iterable collection or a promise of a collection
   * @returns A new Chain instance wrapping the collection
   * @public
   */
  static of<BType>(
    collection: Collection<BType> | PromiseLike<Collection<BType>>
  ): Chain<BType> {
    return new Chain<BType>(collection);
  }

  private constructor(collection: Collection<B> | PromiseLike<Collection<B>>) {
    this.collection = collection;
    const _list = (async function () {
      return [...(await collection)];
    })();
    this._list = _list;

    // public ['fantasy-land/map'] = this.map;
    Object.defineProperty(this, 'fantasy-land/map', {
      value: this.map,
      enumerable: false,
      writable: false,
      configurable: false,
    });

    Object.defineProperty(this, 'collection', {
      value: collection,
      enumerable: true,
      writable: false,
      configurable: false,
    });

    Object.defineProperty(this, '_list', {
      value: _list,
      enumerable: false,
      writable: false,
    });
    return this;
  }

  /**
   * Applies transformations to each item in the collection in series (one after another).
   * Based on a for...of loop, ensuring sequential processing.
   *
   * @param transformFn - Function to transform each item (optional)
   * @param lookupFn - Function to perform side effects after transformation (optional)
   * @param validateFn - Function to validate the transformed value (optional)
   * @param errLookupFn - Function to handle errors (optional)
   * @returns A new Chain with the transformed collection
   * @public
   */
  public serialMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result = serialMapping(
      this.collection,
      transformFn,
      lookupFn,
      validateFn,
      errLookupFn
    );
    return new Chain(result);
  }

  /**
   * Applies transformations to each item in parallel using Promise.all.
   * This is the most commonly used method for async transformations.
   *
   * @param transformFn - Function to transform each item (optional)
   * @param lookupFn - Function to perform side effects after transformation (optional)
   * @param validateFn - Function to validate the transformed value (optional)
   * @param errLookupFn - Function to handle errors (optional)
   * @returns A new Chain with the transformed collection
   * @public
   */
  public awaitedMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result = awaitedMapping(
      this.collection,
      transformFn,
      lookupFn,
      validateFn,
      errLookupFn
    );
    return new Chain(result);
  }

  /**
   * Maps over the collection in parallel returning an array of promises.
   * Based on Array.prototype.map, each element is processed independently.
   *
   * @param transformFn - Function to transform each item (optional)
   * @param lookupFn - Function to perform side effects after transformation (optional)
   * @param validateFn - Function to validate the transformed value (optional)
   * @param errLookupFn - Function to handle errors (optional)
   * @returns A new Chain with promises of settled results
   * @public
   */
  public parallelMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<Promise<Settled<R>>> {
    const result = (async (): Promise<Promise<Settled<R>>[]> =>
      parallelMapping(
        await this.collection,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      ))();

    return new Chain<Promise<Settled<R>>>(result);
  }

  public generateMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<Promise<Settled<R>>> {
    const result = (async () =>
      generateMapping(
        await this.collection,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      ))();

    return new Chain(result);
  }

  public async generator<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Promise<Generator<Promise<Settled<R>>, void>> {
    return generateMapping(
      await this.collection,
      transformFn,
      lookupFn,
      validateFn,
      errLookupFn
    );
  }

  public generateMappingAsync<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result = (async () => {
      const asyncGenerator = generateMappingAsync(
        await this.collection,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      );
      const arr = [];
      for await (const entry of asyncGenerator) {
        arr.push(entry);
      }
      return arr;
    })();

    return new Chain(result);
  }

  public asyncGeneretor<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): AsyncGenerator<Settled<R>, void> {
    return generateMappingAsync(
      this.collection,
      transformFn,
      lookupFn,
      validateFn,
      errLookupFn
    );
  }

  public async filterRight(): Promise<SettledRight<B>[]> {
    const list = [...(await this.collection)];
    return list.every((item): item is Settled<B> => isSettled(item))
      ? filterRight<B>(list)
      : filterRight<B>(await awaitedMapping(list));
  }

  public async filterLeft(): Promise<SettledLeft[]> {
    const list = [...(await this.collection)];
    return list.every((item): item is Settled<B> => isSettled(item))
      ? filterLeft(list)
      : filterLeft(await awaitedMapping(list));
  }

  public async extractFulfilledValues(): Promise<B[]> {
    return extractFulfilledValues<B>(await awaitedMapping(this._list));
  }

  public async extractSettledValues(): Promise<(B | typeof NULL_SYMBOL)[]> {
    return extractSettledValues<B>(await awaitedMapping(this._list));
  }

  /**
   * Retrieves the settled array values with fulfilled and rejected entries.
   * This is the primary method to extract final results from the chain.
   * Alias for awaited list collection.
   *
   * @returns A Promise that resolves to an array of settled results
   * @public
   */
  public async toArray(): Promise<Settled<B>[]> {
    const list = [...(await this.collection)];
    return list.every((item): item is Settled<B> => isSettled(item))
      ? list
      : awaitedMapping(list);
  }

  /**
   * Retrieves only the successfully fulfilled values from the chain.
   * This is a convenience method that filters out rejected values.
   * Equivalent to `toArray()` followed by `extractFulfilledValues()`.
   *
   * @returns A Promise that resolves to an array of fulfilled values only
   * @public
   */
  public async getValues(): Promise<B[]> {
    return this.extractFulfilledValues();
  }

  /**
   * Retrieves all values including NULL_SYMBOL for rejected entries.
   * Maintains the original array length and positions.
   *
   * @returns A Promise that resolves to an array with fulfilled values and NULL_SYMBOL for rejected entries
   * @public
   */
  public async getAllValues(): Promise<(B | typeof NULL_SYMBOL)[]> {
    return this.extractSettledValues();
  }

  get list(): Promise<BaseOrDeferred<B>[]> {
    return this._list;
  }
  // fantasy-land/ap method
  // ap :: Chain m => m a ~> m (a -> b) -> m b
  // fantasy-land/ap :: Apply f => f a ~> f (a -> b) -> f b
  /*
  Apply
A value that implements the Apply specification must also implement the Functor specification.

v['fantasy-land/ap'](u['fantasy-land/ap'](a['fantasy-land/map'](f => g => x => f(g(x))))) is equivalent to v['fantasy-land/ap'](u)['fantasy-land/ap'](a) (composition)

fantasy-land/ap method
fantasy-land/ap :: Apply f => f a ~> f (a -> b) -> f b
A value which has an Apply must provide a fantasy-land/ap method. The fantasy-land/ap method takes one argument:

a['fantasy-land/ap'](b)
b must be an Apply of a function

If b does not represent a function, the behaviour of fantasy-land/ap is unspecified.
b must be same Apply as a.
a must be an Apply of any value

fantasy-land/ap must apply the function in Apply b to the value in Apply a

No parts of return value of that function should be checked.
The Apply returned by fantasy-land/ap must be the same as a and b
  */

  // public ap<R>(this: Chain<(a: B) => R>, other: Chain<B>): Chain<R> {
  //   return other.map(this.collection);
  // }
  /**
   * ### Functor
   *
   * 1. `u['fantasy-land/map'](a => a)` is equivalent to `u` (identity)
   * 2. `u['fantasy-land/map'](x => f(g(x)))` is equivalent to `u['fantasy-land/map'](g)['fantasy-land/map'](f)` (composition)
   *
   * <a name="map-method"></a>
   *
   * #### `fantasy-land/map` method
   *
   * ```hs
   * fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b
   * ```
   *
   * A value which has a Functor must provide a `fantasy-land/map` method. The `fantasy-land/map`
   * method takes one argument:
   *
   *     u['fantasy-land/map'](f)
   *
   * 1. `f` must be a function,
   *
   *     1. If `f` is not a function, the behaviour of `fantasy-land/map` is
   *        unspecified.
   *     2. `f` can return any value.
   *     3. No parts of `f`'s return value should be checked.
   *
   * 2. `fantasy-land/map` must return a value of the same Functor
   *
   */
  public ['fantasy-land/map']: typeof this.map = this.map;

  public map<R>(
    transformFn: TransformFn<BaseOrDeferred<B>, R>,
    lookupFn?: LookupFn<BaseOrDeferred<B>, R> | null,
    validateFn?: ValidateFn<BaseOrDeferred<B>, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result: PromiseLike<Collection<R>> = (async () => {
      const arr = await this._list;
      const awaitedArr = awaitedMapping(
        arr,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      );
      return awaitedArr;
    })();

    return new Chain<R>(result);
  }
}

// export { Chain };
export default { Chain };

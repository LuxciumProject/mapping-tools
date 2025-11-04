import type { NULL_SYMBOL } from '..';
import type {
  BaseOrDeferred,
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '.';

/**
 *  @beta
 *  @group IChain
 */
export interface IChain<B> {
  collection: Collection<B> | PromiseLike<Collection<B>>;
  // of<BType>(
  //   collection: Collection<BType> | PromiseLike<Collection<BType>>
  // ): Chain<BType>;
  serialMapping: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => IChain<R>;
  awaitedMapping: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => IChain<R>;
  parallelMapping: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => IChain<Promise<Settled<R>>>;
  generateMapping: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => IChain<Promise<Settled<R>>>;
  generator: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => Promise<Generator<Promise<Settled<R>>, void>>;
  generateMappingAsync: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => IChain<R>;
  asyncGeneretor: <R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => AsyncGenerator<Settled<R>, void>;
  filterRight: () => Promise<SettledRight<B>[]>;
  filterLeft: () => Promise<SettledLeft[]>;
  extractFulfilledValues: () => Promise<B[]>;
  extractSettledValues: () => Promise<(B | typeof NULL_SYMBOL)[]>;
  /**
   * Retrieves the settled array values with fulfilled and rejected entries.
   * This is the primary method to extract final results from the chain.
   */
  toArray: () => Promise<Settled<B>[]>;
  /**
   * Retrieves only the successfully fulfilled values from the chain.
   * This is a convenience method that filters out rejected values.
   */
  getValues: () => Promise<B[]>;
  /**
   * Retrieves all values including NULL_SYMBOL for rejected entries.
   * Maintains the original array length and positions.
   */
  getAllValues: () => Promise<(B | typeof NULL_SYMBOL)[]>;
  get list(): Promise<BaseOrDeferred<B>[]>;
}

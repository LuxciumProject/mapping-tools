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
import type { NULL_SYMBOL } from '..';

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
  get list(): Promise<BaseOrDeferred<B>[]>;
}

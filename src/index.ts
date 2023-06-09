/* istanbul ignore file */
/**
 * A library for mapping tools.
 *
 *
 * The `@luxcium/mapping-tools` library defines 5 core functions used to map on iterables with diferent outcomes in mind
 * - {@link awaitedMapping}
 * - {@link generateMappingAsync}
 * - {@link generateMapping}
 * - {@link parallelMapping}
 * - {@link serialMapping}
 *
 * @remarks
 * Each function takes a collection as its first argument which can
 * be any iterable and can take on of 4 optional life cycle hooks:
 * - {@link TransformFn}
 * - {@link LookupFn}
 * - {@link ValidateFn}
 * - {@link ErrLookupFn}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol | The Iterable Protocol}
 * @packageDocumentation
 */

import { Chain } from './classes/Chain';
import * as constants from './constants';
import { awaitedMapping } from './functions/awaitedMapping';
import { fn_a1f9a } from './functions/core';
import { generateMapping } from './functions/generateMapping';
import { generateMappingAsync } from './functions/generateMappingAsync';
import { parallelMapping } from './functions/parallelMapping';
import { serialMapping } from './functions/serialMapping';
import type {
  // AwaitedMappingFn,
  // Base,
  // BaseOrDeferred,
  // Collection,
  // CollectionOfDeferred,
  // Deferred,
  // DeferredCollection,
  ErrLookupFn,
  // GenerateMappingAsyncFn,
  // GenerateMappingFn,
  // IChain,
  LookupFn,
  // NullSymbol,
  // OnlySideEffect,
  // ParallelMappingFn,
  // SerialMappingFn,
  // Settled,
  // SettledArray,
  // SettledLeft,
  // SettledRight,
  // SettledValue,
  // SettledValues,
  TransformFn,
  // TransformStep,
  ValidateFn,
} from './types';

export {
  hasTransformStep,
  isPromise,
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseRejectedResult,
  isPromiseSettledResult,
  isSettled,
  isSettledLeft,
  isSettledRight,
} from './helpers/assertions';
export {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
  getTransformStep,
  toFulfilment,
} from './helpers/tools';
export * from './types';
// export type {
//   AwaitedMappingFn,
//   Base,
//   BaseOrDeferred,
//   Collection,
//   CollectionOfDeferred,
//   constants,
//   Deferred,
//   DeferredCollection,
//   GenerateMappingAsyncFn,
//   GenerateMappingFn,
//   IChain,
//   NullSymbol,
//   OnlySideEffect,
//   ParallelMappingFn,
//   SerialMappingFn,
//   Settled,
//   SettledArray,
//   SettledLeft,
//   SettledRight,
//   SettledValue,
//   SettledValues,
//   TransformStep,
// };
/**
 * @category Delegates Functions
 *
 * @group Delegates
 *
 */
export type { ErrLookupFn, LookupFn, TransformFn, ValidateFn };
/**
 *
 *### awaitedMapping
 *
 ***`awaitedMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Promise<Array<Settled<R>>>`**
 *
 *Applies the provided callback functions to each item in the collection, and returns a promise that resolves to an array of the transformed and validated items, represented as `Settled<R>` objects.
 *- Based on `Promise.all($)`
 *- Function signature:
 *  ```typescript
 *  export async function awaitedMapping<T, R>(
 *    collection: DeferredCollection<T>,
 *    transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *    lookupFn: LookupFn<T, R> | null = v => void v,
 *    validateFn: ValidateFn<T, R> | null = async v => void v,
 *    errLookupFn: ErrLookupFn | null = v => void v
 *  ): Promise<Settled<R>[]>;
 *  ```
 *- Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
 *- Returns: `Promise<Array<Settled<R>>>`
 */
export { awaitedMapping };
/**
 * istanbul ignore next
 * UNSAFE: Name of the class will change in future release
 * @experimental
 * @beta
 */
export { Chain };
/**
 *
 * ### generateMapping
 * **`generateMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Generator<Promise<Settled<R>>, void, unknown>`**
 *
 * Applies the provided callback functions to each item in the collection, and returns a generator that yields promises that resolve to the transformed and validated items, represented as `Settled<R>` objects.
 * - Based on the `Generator` _Protocol_
 * - Function signature:
 *
 *   ```typescript
 *   export function* generateMapping<T, R>(
 *     collection: Collection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): Generator<Promise<Settled<R>>, void, unknown>;
 *   ```
 * - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
 * - Returns: `Generator<Promise<Settled<R>>, void, unknown>`
 */
export { generateMapping };
/**
 * ### generateMappingAsync
 * **`generateMappingAsync(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): AsyncGenerator<Settled<R>, void, unknown>`**
 * Applies the provided callback functions to each item in the collection, and returns an async generator that yields the transformed and validated items, represented as `Settled<R>` objects.
 * - Based on the `AsyncGenerator` _Protocol_
 * - Function signature:
 *   ```typescript
 *   export async function* generateMappingAsync<R, T>(
 *     collection: DeferredCollection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): AsyncGenerator<Settled<R>, void, unknown>;
 *   ```
 * - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
 * - Returns: `AsyncGenerator<Settled<R>, void, unknown>`
 */
export { generateMappingAsync };
/**
 * ### parallelMapping
 *
 ***`parallelMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Array<Promise<Settled<R>>>`**
 *
 * Applies the provided callback functions to each item in the
 * collection in parallel, and returns an array of promises that
 * resolve to the transformed and validated items, represented as
 * `Settled<R>` objects.
 * - Based on an `Array.prototype.map($)`
    * - Function signature:
 *   ```typescript
 *   export function parallelMapping<T, R>(
 *     collection: Collection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): Promise<Settled<R>>[];
 *   ```
 * - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
 * - Returns: `Array<Promise<Settled<R>>>`

 *
 */
export { parallelMapping };
/**
 * ### serialMapping
 * **`serialMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Promise<Array<Settled<R>>>`**
 * Applies the provided callback functions to each item in the collection in series, and returns a promise that resolves to an array of the transformed and validated items, represented as `Settled<R>` objects.
 * - Based on `forOf` _loop_
 * - Function signature:
 *   ```typescript
 *   export async function serialMapping<T, R>(
 *     collection: DeferredCollection<T>,
 *     transformFn: TransformFn<T, R> | null = async value => value as any as R,
 *     lookupFn: LookupFn<T, R> | null = v => void v,
 *     validateFn: ValidateFn<T, R> | null = async v => void v,
 *     errLookupFn: ErrLookupFn | null = v => void v
 *   ): Promise<Settled<R>[]> {}
 *   ```
 * - Takes as its main input: `Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>>>`
 * - Returns: `Promise<Array<Settled<R>>>`
 */
export { serialMapping };
export { functions };

/**
 * Constant `FULFILLED` is used in place of the string `'fulfilled'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const FULFILLED: typeof constants.FULFILLED = constants.FULFILLED;
// export const FULFILLED: 'fulfilled' = 'fulfilled' as const;

/**
 * Constant `REJECTED` is used in place of the string `'rejected'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const REJECTED: typeof constants.REJECTED = constants.REJECTED;
// export const REJECTED: 'rejected' = 'rejected' as const;

/**
 * Constant `NULL_SYMBOL` is a unique symbol that represents `null` or a union type that includes `null`.
 * @public
 */
export const NULL_SYMBOL: typeof constants.NULL_SYMBOL = constants.NULL_SYMBOL;
// export const NULL_SYMBOL: unique symbol = Symbol.for('NULL_SYMBOL');

const functions = {
  awaitedMapping,
  generateMapping,
  generateMappingAsync,
  parallelMapping,
  serialMapping,
};

export const internals = { fn_a1f9a };

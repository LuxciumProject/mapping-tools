## API Report File for "mapping-tools"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

declare namespace assertionTools {
    export {
        isPromise,
        isPromiseLike,
        isPromiseFulfilledResult,
        isPromiseRejectedResult,
        isPromiseSettledResult,
        hasTransformStep,
        isSettled,
        isSettledLeft,
        isSettledRight
    }
}
export { assertionTools }

// @beta
export function awaitedMapping<T, R>(collection: DeferredCollection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null): Promise<Settled<R>[]>;

// @alpha (undocumented)
export type AwaitedMappingFn = Function & (<T, R>(collection: Collection<T> | PromiseLike<Collection<T>>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null) => Promise<Settled<R>[]>);

// @public (undocumented)
export type Base<TVal> = TVal | Settled<TVal> | PromiseSettledResult<TVal> | SettledRight<TVal> | PromiseFulfilledResult<TVal> | SettledLeft | PromiseRejectedResult;

// @public
export type BaseOrDeferred<B> = Base<B> | Deferred<B>;

// @beta
export class Chain<B> implements IChain<B> {
    // (undocumented)
    asyncGeneretor<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): AsyncGenerator<Settled<R>, void, unknown>;
    // (undocumented)
    awaitedMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<R>;
    // (undocumented)
    collection: Collection<B> | PromiseLike<Collection<B>>;
    // (undocumented)
    extractFulfilledValues(): Promise<B[]>;
    // (undocumented)
    extractSettledValues(): Promise<(B | typeof NULL_SYMBOL)[]>;
    // (undocumented)
    filterLeft(): Promise<SettledLeft[]>;
    // (undocumented)
    filterRight(): Promise<SettledRight<B>[]>;
    // (undocumented)
    generateMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<Promise<Settled<R>>>;
    // (undocumented)
    generateMappingAsync<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<R>;
    // (undocumented)
    generator<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Promise<Generator<Promise<Settled<R>>, void, unknown>>;
    // (undocumented)
    get list(): Promise<BaseOrDeferred<B>[]>;
    // (undocumented)
    static of<BType>(collection: Collection<BType> | PromiseLike<Collection<BType>>): Chain<BType>;
    // (undocumented)
    parallelMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<Promise<Settled<R>>>;
    // (undocumented)
    serialMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<R>;
}

// @public
export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;

// @public
export type CollectionOfDeferred<B> = Iterable<Deferred<B>>;

declare namespace constants {
    export {
        FULFILLED_2 as FULFILLED,
        REJECTED_2 as REJECTED,
        NULL_SYMBOL_2 as NULL_SYMBOL
    }
}
export { constants }

// @public
export type Deferred<B> = PromiseLike<Base<B>>;

// @public
export type DeferredCollection<B> = Collection<B> | PromiseLike<Collection<B>>;

// @public
export interface ErrLookupFn {
    // (undocumented)
    (reason: any, index: number, currentRejection: boolean): OnlySideEffect;
}

// @public
export function extractFulfilledValues<R>(settledArray: Settled<R>[]): R[];

// @public
export function extractSettledValues<R>(settledArray: Settled<R>[]): (R | typeof NULL_SYMBOL_2)[];

// @public
export function filterLeft<R>(settledArray: Settled<R>[]): SettledLeft[];

// @public
export function filterRight<R>(settledArray: Settled<R>[]): SettledRight<R>[];

// @public (undocumented)
export const FULFILLED: typeof constants.FULFILLED;

// @public
const FULFILLED_2: 'fulfilled';

declare namespace functions {
    export {
        awaitedMapping,
        generateMapping,
        generateMappingAsync,
        parallelMapping,
        serialMapping
    }
}
export { functions }

// @beta
export function generateMapping<T, R>(collection: Collection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null): Generator<Promise<Settled<R>>, void, unknown>;

// @beta
export function generateMappingAsync<R, T>(collection: DeferredCollection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null): AsyncGenerator<SettledLeft | SettledRight<R>, void, unknown>;

// @alpha (undocumented)
export type GenerateMappingAsyncFn = Function & (<R, T>(collection: Collection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null) => AsyncGenerator<Settled<R>, void, unknown>);

// @alpha (undocumented)
export type GenerateMappingFn = Function & (<T, R>(collection: Collection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null) => Generator<Promise<Settled<R>>, void, unknown>);

// @public
export function getTransformStep(item: unknown, initialTransformStep?: number): number;

// Warning: (ae-incompatible-release-tags) The symbol "hasTransformStep" is marked as @public, but its signature references "TransformStep" which is marked as @beta
// Warning: (ae-incompatible-release-tags) The symbol "hasTransformStep" is marked as @public, but its signature references "TransformStep" which is marked as @beta
//
// @public
export function hasTransformStep(countender: unknown): countender is TransformStep;

declare namespace helpers {
    export {
        assertionTools as assertions,
        tools
    }
}
export { helpers }

// @beta (undocumented)
export interface IChain<B> {
    // (undocumented)
    asyncGeneretor<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): AsyncGenerator<Settled<R>, void, unknown>;
    // (undocumented)
    awaitedMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<R>;
    // (undocumented)
    collection: Collection<B> | PromiseLike<Collection<B>>;
    // (undocumented)
    extractFulfilledValues(): Promise<B[]>;
    // (undocumented)
    extractSettledValues(): Promise<(B | typeof NULL_SYMBOL)[]>;
    // (undocumented)
    filterLeft(): Promise<SettledLeft[]>;
    // (undocumented)
    filterRight(): Promise<SettledRight<B>[]>;
    // (undocumented)
    generateMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<Promise<Settled<R>>>;
    // (undocumented)
    generateMappingAsync<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<R>;
    // (undocumented)
    generator<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Promise<Generator<Promise<Settled<R>>, void, unknown>>;
    // (undocumented)
    get list(): Promise<BaseOrDeferred<B>[]>;
    // (undocumented)
    parallelMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<Promise<Settled<R>>>;
    // (undocumented)
    serialMapping<R>(transformFn?: TransformFn<B, R> | null, lookupFn?: LookupFn<B, R> | null, validateFn?: ValidateFn<B, R> | null, errLookupFn?: ErrLookupFn | null): Chain<R>;
}

// @public
export function isPromise<U>(element?: U | Promise<U>): element is Promise<U>;

// @public
export function isPromiseFulfilledResult<T>(contender: unknown): contender is PromiseFulfilledResult<T>;

// @public
export function isPromiseLike<U>(element?: U | PromiseLike<U>): element is PromiseLike<U>;

// @public
export function isPromiseRejectedResult(contender: unknown): contender is PromiseRejectedResult;

// @public
export function isPromiseSettledResult<T>(contender: any): contender is PromiseSettledResult<T>;

// @public
export function isSettled<T>(contender: unknown): contender is Settled<T>;

// @public
export function isSettledLeft(contender: unknown): contender is SettledLeft;

// @public
export function isSettledRight<T>(contender: unknown): contender is SettledRight<T>;

// @public (undocumented)
export interface LookupFn<S, U = unknown> {
    // (undocumented)
    (value: U, index: number, array: readonly (S | Settled<S> | PromiseSettledResult<S>)[]): OnlySideEffect;
}

// @public (undocumented)
export const NULL_SYMBOL: typeof constants.NULL_SYMBOL;

// @public
const NULL_SYMBOL_2: unique symbol;

// @public (undocumented)
export type NullSymbol = typeof NULL_SYMBOL_2;

// @public (undocumented)
export type OnlySideEffect = void | undefined;

// @beta
export function parallelMapping<T, R>(collection: Collection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null): Promise<Settled<R>>[];

// @alpha (undocumented)
export type ParallelMappingFn = Function & (<T, R>(collection: Collection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null) => Promise<Settled<R>>[]);

// @public (undocumented)
export const REJECTED: typeof constants.REJECTED;

// @public
const REJECTED_2: 'rejected';

// @beta
export function serialMapping<T, R>(collection: DeferredCollection<T>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null): Promise<Settled<R>[]>;

// @alpha (undocumented)
export type SerialMappingFn = Function & (<T, R>(collection: Collection<T> | PromiseLike<Collection<T>>, transformFn?: TransformFn<T, R> | null, lookupFn?: LookupFn<T, R> | null, validateFn?: ValidateFn<T, R> | null, errLookupFn?: ErrLookupFn | null) => Promise<Settled<R>[]>);

// @public
export type Settled<T> = SettledLeft | SettledRight<T>;

// @public (undocumented)
export type SettledArray<R> = Settled<R>[];

// @public
export type SettledLeft = PromiseRejectedResult & {
    status: 'rejected';
    reason: any;
    value?: undefined;
    rejected: any;
    fulfilled: null;
    transformStep: number;
    currentRejection: true | false | undefined;
    index: number;
};

// @public
export type SettledRight<T> = PromiseFulfilledResult<T> & {
    status: 'fulfilled';
    value: T;
    reason?: undefined;
    fulfilled: T;
    rejected: null;
    transformStep: number;
    currentRejection: null;
    index: number;
};

// @public (undocumented)
export type SettledValue<R> = R | NullSymbol;

// @public (undocumented)
export type SettledValues<R> = SettledValue<R>[];

// @public
function toFulfilment<T>(list: Iterable<T>): SettledRight<T>[];

declare namespace tools {
    export {
        extractFulfilledValues,
        extractSettledValues,
        filterLeft,
        filterRight,
        toFulfilment,
        getTransformStep
    }
}
export { tools }

// @public (undocumented)
export interface TransformFn<T, U = unknown> {
    // (undocumented)
    (value: T, index: number, array: readonly (T | PromiseSettledResult<T>)[]): U | Promise<ReturnType<() => U>>;
}

// @beta (undocumented)
export type TransformStep = {
    transformStep: number;
};

// @public (undocumented)
export interface ValidateFn<S, U = unknown> {
    // (undocumented)
    (value: U, index: number, array: readonly (S | PromiseSettledResult<S>)[]): Promise<OnlySideEffect>;
}

```
import { NULL_SYMBOL } from '../constants';
import { Settled, SettledLeft, SettledRight } from './Settled';

/**
 * @group Base Types
 * @public
 * */

export type Base<TVal> =
  | TVal
  | Settled<TVal>
  | PromiseSettledResult<TVal>
  | SettledRight<TVal>
  | PromiseFulfilledResult<TVal>
  | SettledLeft
  | PromiseRejectedResult;

/**
 * Alias for `Iterable<Base<B>>` or `Iterable<PromiseLike<Base<B>>>`
 * @group Base Types
 * @public
 */
export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;

/**
 * Alias `PromiseLike<Base<B>>`
 * @public
 */
export type Deferred<B> = PromiseLike<Base<B>>;

/**
 * Alias for `Iterable<PromiseLike<Base<B>>>`
 * @public
 */
export type CollectionOfDeferred<B> = Iterable<Deferred<B>>;

/**
 * Alias for `Base<B>` or `PromiseLike<Base<B>>`
 * @public
 */
export type BaseOrDeferred<B> = Base<B> | Deferred<B>;

/**
 * Alias for `Iterable<Base<B>> | Iterable<PromiseLike<Base<B>>>`
 * or `PromiseLike<Iterable<Base<B>> | Iterable<PromiseLike<Base<B>>>>`
 *
 * @public
 */
export type DeferredCollection<B> = Collection<B> | PromiseLike<Collection<B>>;

/** @public */
// export type Deferred<B> = PromiseLike<Base<B>>;

/** @public */
// export type BaseOrDeferred<B> = Base<B> | Deferred<B>;

/** @public */
// export type CollectionOfDeferred<B> = Iterable<Deferred<B>>;

/** @public */
// export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;

/** @public */
// export type DeferredCollection<B> = Collection<B> | PromiseLike<Collection<B>>;

/** @public */
export type SettledArray<R> = Settled<R>[];

/** @public */
export type NullSymbol = typeof NULL_SYMBOL;

/** @public */
export type SettledValue<R> = R | NullSymbol;

/** @public */
export type SettledValues<R> = SettledValue<R>[];

/** @public */
export type OnlySideEffect = void | undefined;

export type Type1<B> = Base<B> | PromiseLike<Base<B>>;
export type Type1a<B> = Base<B>;
export type Type1b<B> = PromiseLike<Base<B>>;

export type Type2<B> = Iterable<Base<B>> | Iterable<PromiseLike<Base<B>>>;
export type Type2a<B> = Iterable<Base<B>>;
export type Type2b<B> = Iterable<PromiseLike<Base<B>>>;

export type Type3<B> =
  | PromiseLike<Iterable<Base<B>>>
  | PromiseLike<Iterable<PromiseLike<Base<B>>>>;
export type Type3a<B> = PromiseLike<Iterable<Base<B>>>;
export type Type3b<B> = PromiseLike<Iterable<PromiseLike<Base<B>>>>;

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------

// type ExtractCollectionType<T> = T extends Iterable<infer U> ? U : never;

// type UnboxPromise<T> = T extends Promise<infer U> ? U : T;

// const myStrings: string[] = ['foo', 'bar', 'baz'];
// const MyCollection: Collection<string> = myStrings;

// export type MyB = UnboxPromise<Exclude<ExtractCollectionType<typeof MyCollection>, Base<string> | Deferred<string>>>;
// // This should be `string`

type ExtractCollectionType<T> = T extends Iterable<infer U>
  ? U extends Deferred<infer V>
    ? V extends Iterable<infer W>
      ? ExtractCollectionType<W>
      : V extends Base<infer X>
      ? X
      : never
    : U extends Base<infer Y>
    ? Y
    : never
  : never;

// Example usage
export type MyType = ExtractCollectionType<Collection<string>>;
// MyType is string
type Nested<T> = T extends Iterable<infer U>
  ? U extends Deferred<infer V>
    ? Nested<V>
    : U extends Base<infer W>
    ? Nested<W>
    : never
  : T;

export type ExtractCollectionType2<T> = Nested<Collection<T>>;

const myArray: Array<Promise<string>> = [
  Promise.resolve('foo'),
  Promise.reject('bar'),
];

export type MyCollectionType = ExtractCollectionType<typeof myArray>; // MyCollectionType is "Settled<string>"

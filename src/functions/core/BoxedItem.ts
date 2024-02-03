import type { Settled, SettledLeft, SettledRight } from '../../types';
import type { IUnbox } from './BoxedList';
import { makeSettler } from './makeSettler';

/*
PromiseFulfilledResult<TVal>
PromiseRejectedResult
PromiseSettledResult<TVal>
Settled<TVal>
SettledLeft
SettledRight<TVal>
TVal;
Promise<Settled<R>>
: Promise<Settled<T>> | Settled<T>

//    public static of<TVal>(item: TVal)
//    public static of<TVal>(item: PromiseLike<TVal>)
//    public static of<TVal>(item: Settled<TVal>)
//    public static of<TVal>(item: PromiseLike<Settled<TVal>>)
//    public static of<TVal>(item: PromiseSettledResult<TVal>)
//    public static of<TVal>(item: PromiseLike<PromiseSettledResult<TVal>>)
//    public static of<TVal>(item: SettledRight<TVal>)
//    public static of<TVal>(item: PromiseLike<SettledRight<TVal>>)
//    public static of<TVal>(item: PromiseFulfilledResult<TVal>)
//    public static of<TVal>(item: PromiseLike<PromiseFulfilledResult<TVal>>)
//    public static of(item: SettledLeft)
//    public static of<TVal>(item: PromiseLike<SettledLeft>)
//    public static of(item: PromiseRejectedResult)
//    public static of<TVal>(item: PromiseLike<PromiseRejectedResult>)
 */

export class BoxedItem<T> implements IUnbox<T> {
  // static ============================================-| of() |-====
  public static of<TVal>(item: Settled<TVal>): BoxedItem<Settled<TVal>>;
  public static of<TVal>(
    item: PromiseLike<Settled<TVal>>
  ): BoxedItem<Promise<Settled<TVal>>>;
  public static of<TVal>(item: SettledRight<TVal>): BoxedItem<Settled<TVal>>;
  public static of<TVal>(
    item: PromiseLike<SettledRight<TVal>>
  ): BoxedItem<Promise<Settled<TVal>>>;
  public static of<TVal>(
    item: PromiseFulfilledResult<TVal>
  ): BoxedItem<Settled<TVal>>;
  public static of<TVal>(
    item: PromiseLike<PromiseFulfilledResult<TVal>>
  ): BoxedItem<Promise<Settled<TVal>>>;
  public static of(item: SettledLeft): BoxedItem<Settled<any>>;
  public static of<TVal>(
    item: PromiseLike<SettledLeft>
  ): BoxedItem<Promise<Settled<any>>>;
  public static of(item: PromiseRejectedResult): BoxedItem<Settled<any>>;
  public static of<TVal>(
    item: PromiseLike<PromiseRejectedResult>
  ): BoxedItem<Promise<Settled<any>>>;
  public static of<TVal>(
    item: PromiseSettledResult<TVal>
  ): BoxedItem<Settled<TVal>>;
  public static of<TVal>(
    item: PromiseLike<PromiseSettledResult<TVal>>
  ): BoxedItem<Promise<Settled<TVal>>>;
  public static of<TVal>(item: TVal): BoxedItem<Settled<TVal>>;
  public static of<TVal>(
    item: PromiseLike<TVal>
  ): BoxedItem<Promise<Settled<TVal>>>;

  public static of<TVal>(
    item:
      | PromiseFulfilledResult<TVal>
      | PromiseLike<PromiseFulfilledResult<TVal>>
      | PromiseLike<PromiseRejectedResult>
      | PromiseLike<PromiseSettledResult<TVal>>
      | PromiseLike<Settled<TVal>>
      | PromiseLike<SettledLeft>
      | PromiseLike<SettledRight<TVal>>
      | PromiseLike<TVal>
      | PromiseRejectedResult
      | PromiseSettledResult<TVal>
      | Settled<TVal>
      | SettledLeft
      | SettledRight<TVal>
      | TVal
  ): BoxedItem<Promise<Settled<TVal>>> | BoxedItem<Settled<TVal>> {
    // public static of<TVal>(item: Base<TVal>) {
    const value = makeSettler(item);
    return new BoxedItem<typeof value>(value);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(box: IUnbox<TVal>) {
    return BoxedItem.of(box.unbox()); // Settled<TVal>
  }

  // protected ================================-| constructor() |-====
  protected constructor(protected value: Settled<T>) {}

  unbox(): Settled<T> {
    return this.value;
  }
}

/*


  export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;
  public static of<TVal>(values: Base<TVal>[]): BoxedList<Base<TVal>>;
  public static of<TVal>(values: PromiseFulfilledResult<TVal>[]): BoxedList<PromiseFulfilledResult<TVal>>;
  public static of(values: PromiseRejectedResult[]): BoxedList<PromiseRejectedResult>;
  public static of<TVal>(values: PromiseSettledResult<TVal>[]): BoxedList<PromiseSettledResult<TVal>>;
  public static of<TVal>(values: Settled<TVal>[]): BoxedList<Settled<TVal>>;
  public static of(values: SettledLeft[]): BoxedList<SettledLeft>;
  public static of<TVal>(values: SettledRight<TVal>[]): BoxedList<SettledRight<TVal>>;
  public static of<TVal>(values: TVal[]): BoxedList<TVal>;
    Promise<Settled<R>[]>
    Promise<Settled<R>>[]
    Generator<Promise<Settled<R>>, void>
    AsyncGenerator<Settled<R>, void, unknown>
    Collection<T> = Iterable<Base<T> | PromiseLike<Base<T>>
    DeferredCollection<T> = Iterable<Base<T> | PromiseLike<Base<T>>>



import type { Base, Settled, SettledLeft, SettledRight } from '../../types';

class BoxedList<T> implements IUnbox<T[]>, IUnboxList<T> {
  // static ============================================-| of() |-====
  public static of<TVal>(values: Base<TVal>[]): BoxedList<Base<TVal>>;
  public static of<TVal>(
    values: PromiseFulfilledResult<TVal>[]
  ): BoxedList<PromiseFulfilledResult<TVal>>;
  public static of(
    values: PromiseRejectedResult[]
  ): BoxedList<PromiseRejectedResult>;
  public static of<TVal>(
    values: PromiseSettledResult<TVal>[]
  ): BoxedList<PromiseSettledResult<TVal>>;
  public static of<TVal>(values: Settled<TVal>[]): BoxedList<Settled<TVal>>;
  public static of(values: SettledLeft[]): BoxedList<SettledLeft>;
  public static of<TVal>(
    values: SettledRight<TVal>[]
  ): BoxedList<SettledRight<TVal>>;
  public static of<TVal>(values: TVal[]): BoxedList<TVal>;
  public static of<TVal>(values: Base<TVal>[]): BoxedList<Base<TVal>>;
  public static of<TVal>(values: TVal[]): BoxedList<TVal>;
  public static of<TVal>(...values: TVal[]): BoxedList<TVal>;
  public static of(...values: unknown[]): BoxedList<unknown> {

     */

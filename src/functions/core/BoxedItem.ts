import type { SettledRight } from '../../types';
import type { IUnbox } from './BoxedList';
import { makeSettler } from './proto-makeSettler';
import { Box } from './Box';

export class BoxedItem<T> extends Box implements IUnbox<T> {
  //     item: PromiseLike<PromiseSettledResult<T> | Settled<T> | T>,
  //   index?: number
  //   item: PromiseLike<PromiseFulfilledResult<T> | SettledRight<T> | T>,
  // ): Promise<Settled<T>>;
  // Promise<SettledRight<T>>
  /*
   | PromiseLike<PromiseFulfilledResult<TVal> | SettledRight<TVal>>
   | PromiseLike<PromiseRejectedResult | SettledLeft>
   | PromiseLike<PromiseSettledResult<TVal> | Settled<TVal>>
   | PromiseLike<TVal>
   | PromiseFulfilledResult<TVal> | SettledRight<TVal>
   | PromiseRejectedResult | SettledLeft
   | PromiseSettledResult<TVal> | Settled<TVal>
   | TVal
 */
  // public static of<TVal>(
  //   item: PromiseLike<PromiseFulfilledResult<TVal> | SettledRight<TVal>>
  // ): BoxedItem<Promise<SettledRight<TVal>>>;
  // public static of(
  //   item: PromiseLike<PromiseRejectedResult | SettledLeft>
  // ): BoxedItem<Promise<SettledLeft>>;
  // public static of<TVal>(
  //   item: PromiseLike<PromiseSettledResult<TVal> | Settled<TVal>>
  // ): BoxedItem<Promise<Settled<TVal>>>;
  // public static of<TVal>(
  //   item: PromiseLike<TVal>
  // ): BoxedItem<Promise<SettledRight<TVal>>>;
  // public static of<TVal>(
  //   item: PromiseFulfilledResult<TVal> | SettledRight<TVal>
  // ): BoxedItem<SettledRight<TVal>>;
  // public static of(
  //   item: PromiseRejectedResult | SettledLeft
  // ): BoxedItem<SettledLeft>;
  // public static of<TVal>(
  //   item: PromiseSettledResult<TVal> | Settled<TVal>
  // ): BoxedItem<Settled<TVal>>;
  // public static of<TVal>(item: TVal): BoxedItem<SettledRight<TVal>>;
  /*
  item:
    | UnwrapPromiseFulfilledResult<TVal>
    | PromiseLike<UnwrapPromiseFulfilledResult<TVal>>
    | PromiseLike<UnwrapPromiseRejectedResult>
    | PromiseLike<UnwrapPromiseSettledResult<TVal>>
    | PromiseLike<UnwrapSettled<TVal>>
    | PromiseLike<UnwrapSettledLeft>
    | PromiseLike<UnwrapSettledRight<TVal>>
    | PromiseLike<UnwrapPromise<TVal>>
    | UnwrapPromiseRejectedResult
    | UnwrapPromiseSettledResult<TVal>
    | UnwrapSettled<TVal>
    | UnwrapSettledLeft
    | UnwrapSettledRight<TVal>
    | UnwrapPromise<TVal>
 */

  // | PromiseFulfilledResult<TVal>
  // | PromiseLike<PromiseFulfilledResult<TVal>>
  // | PromiseLike<PromiseRejectedResult>
  // | PromiseLike<PromiseSettledResult<TVal>>
  // | PromiseLike<Settled<TVal>>
  // | PromiseLike<SettledLeft>
  // | PromiseLike<SettledRight<TVal>>
  // | PromiseRejectedResult
  // | PromiseSettledResult<TVal>
  // | Settled<TVal>
  // | SettledLeft
  // | SettledRight<TVal>
  //  BoxedItem<SettledRight<TVal> | Promise<SettledRight<TVal>>>(value: SettledRight<TVal> | Promise<SettledRight<TVal>>): BoxedItem<...>
  public static of<TVal>(
    item: PromiseLike<TVal> | TVal
  ): BoxedItem<Promise<SettledRight<TVal>>> | BoxedItem<SettledRight<TVal>>;
  public static of<TVal>(
    item: PromiseLike<TVal>
  ): BoxedItem<Promise<SettledRight<TVal>>>;
  public static of<TVal>(item: TVal): BoxedItem<SettledRight<TVal>>;
  // FUNC DEF: public static of returns a IUnbox<T> Implementation ==//
  // |-static ==========================================-| of() |-===//
  public static of(item: unknown): unknown {
    const value = makeSettler(item);
    return new BoxedItem(value);
  }

  // |-static ========================================-| from() |-===//
  public static from<TVal>(box: IUnbox<TVal>) {
    return BoxedItem.of(box.unbox()); // Settled<TVal>
  }

  // |-protected ==============================-| constructor() |-====
  protected constructor(protected value: T) {
    super();
  }

  unbox(): any {
    return this.value;
  }
}

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

  // static ============================================-| of() |-====
  // public static of<TVal>(item: Settled<TVal>): BoxedItem<Settled<TVal>>;
  // public static of<TVal>(
  //   item: PromiseLike<Settled<TVal>>
  // ): BoxedItem<Promise<Settled<TVal>>>;
  // public static of<TVal>(item: SettledRight<TVal>): BoxedItem<Settled<TVal>>;
  // public static of<TVal>(
  //   item: PromiseLike<SettledRight<TVal>>
  // ): BoxedItem<Promise<Settled<TVal>>>;
  // public static of<TVal>(
  //   item: PromiseFulfilledResult<TVal>
  // ): BoxedItem<Settled<TVal>>;
  // public static of<TVal>(
  //   item: PromiseLike<PromiseFulfilledResult<TVal>>
  // ): BoxedItem<Promise<Settled<TVal>>>;
  // public static of(item: SettledLeft): BoxedItem<Settled<any>>;
  // public static of<TVal>(
  //   item: PromiseLike<SettledLeft>
  // ): BoxedItem<Promise<Settled<any>>>;
  // public static of(item: PromiseRejectedResult): BoxedItem<Settled<any>>;
  // public static of<TVal>(
  //   item: PromiseLike<PromiseRejectedResult>
  // ): BoxedItem<Promise<Settled<any>>>;
  // public static of<TVal>(
  //   item: PromiseSettledResult<TVal>
  // ): BoxedItem<Settled<TVal>>;
  // public static of<TVal>(
  //   item: PromiseLike<PromiseSettledResult<TVal>>
  // ): BoxedItem<Promise<Settled<TVal>>>;
  // public static of<TVal>(item: TVal): BoxedItem<Settled<TVal>>;
  // public static of<TVal>(
  //   item: PromiseLike<TVal>
  // ): BoxedItem<Promise<Settled<TVal>>>;

// | PromiseFulfilledResult<TVal>
      // | PromiseLike<PromiseFulfilledResult<TVal>>
      // | PromiseLike<PromiseRejectedResult>
      // | PromiseLike<PromiseSettledResult<TVal>>
      // | PromiseLike<Settled<TVal>>
      // | PromiseLike<SettledLeft>
      // | PromiseLike<SettledRight<TVal>>
      // | PromiseLike<TVal>
      // | PromiseRejectedResult
      // | PromiseSettledResult<TVal>
      // | Settled<TVal>
      // | SettledLeft
      // | SettledRight<TVal>
      // | TVal
  ) // : BoxedItem<Promise<Settled<TVal>>> | BoxedItem<Settled<TVal>>
    // public static of<TVal>(item: Base<TVal>) {




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

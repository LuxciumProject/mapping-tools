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

 */

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
    if (1 === values.length) {
      const value = values[0];
      if (Array.isArray(value)) {
        return new BoxedList<unknown>([...value]);
      }
      return new BoxedList<unknown>([value]);
    } else if (0 === values.length) {
      return new BoxedList<any>([]);
    }
    return new BoxedList<unknown>([...values]);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(box: IUnbox<TVal[]> & IUnboxList<TVal>) {
    return new BoxedList(box.unbox());
  }

  // protected ================================-| constructor() |-====
  protected constructor(protected values: T[]) {}

  // public =========================================-| unbox() |-====
  public unbox(): T[] {
    return this.values;
  }
}
export default BoxedList;

export interface IUnbox<T> {
  unbox: () => T;
}

export interface IUnboxList<T> extends IUnbox<T[]> {
  unbox: () => T[];
}

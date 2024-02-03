import type { Base } from '../../types';
import type { IUnbox, IUnboxList } from './BoxedList';

export default class MappingList<T> {
  readonly #values: Base<T>[];

  // static ============================================-| of() |-====
  public static of<TVal>(...values: Base<TVal>[] | [Base<TVal>[]]) {
    // I have an array of 0 items, 1 items or more than 1 items, if it has 0 items then it is an empty array, if it has 1 item then it is a single item, if it has more than 1 item then it is a list of items
    let valuesArray: Base<TVal>[];
    if (0 === values.length) {
      return new MappingList<Base<TVal>>([]);
    } else if (1 === values.length) {
      values;
    } else if (1 < values.length) {
      valuesArray = values as any; // [Base<TVal>[]]
    }

    if (1 === values.length && Array.isArray(values[0])) {
      // If a single array is passed, treat it as a single item
      valuesArray = values[0];
      return new MappingList<Base<TVal>>([...valuesArray]);
    }
    return new MappingList<Base<TVal>>([...(values as Base<TVal>[])]);
  }

  // static ==========================================-| of() |-======
  public static of_<TVal>(
    ...values: Base<TVal>[] | [Base<TVal>[]]
  ): MappingList<Base<TVal>> {
    if (1 === values.length && Array.isArray(values[0])) {
      // If a single array is passed, treat it as a single item
      return new MappingList<Base<TVal>>([...values[0]]);
    }
    return new MappingList<Base<TVal>>([...(values as Base<TVal>[])]);
    // never reached
  }

  // static ==========================================-| from() |-====
  /*
  export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;
  Collection<T> = Iterable<Base<T> | PromiseLike<Base<T>>
  DeferredCollection<T> = Iterable<Base<T> | PromiseLike<Base<T>>>
    → serialMapping:
    Promise<Settled<R>[]>
    → parallelMapping:
    Promise<Settled<R>>[]
    → generateMapping:
    Generator<Promise<Settled<R>>, void>

// ::


    → awaitedMapping:
    Promise<Settled<R>[]>
    → generateMappingAsync:
    AsyncGenerator<Settled<R>, void, unknown>


   */
  public static from<TVal>(
    box: IUnbox<TVal[]> | IUnbox<TVal> | IUnboxList<TVal>
  ) {
    const unbox: TVal | TVal[] = box.unbox();
    return MappingList.of<TVal>(unbox as TVal);
  }

  // protected ================================-| constructor() |-====
  protected constructor(value: T[]) {
    this.#values = value;
    return this;
  }

  // core
  // filterRight
  // filterLeft
  // extractFulfilledValues
  // extractSettledValues
  // toFulfilment
  // public ============================================-| list |-====
  public get list() {
    return this.#values;
  }
}

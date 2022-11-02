import { immediateZalgo, timeoutZalgo } from '@luxcium/restraining-zalgo';
import type { IUnbox, IUnboxList, Mapper } from '../types';

/** Create a container to hold a value as an AsyncGenerator on wich you could map */
export class BoxedAsyncGenerator<T> {
  #valueAsyncGenerator: () => AsyncGenerator<T>;

  public static fromGen = <TVal>(asyncGeneratorFn: () => AsyncGenerator<TVal>): BoxedAsyncGenerator<TVal> => {
    return new BoxedAsyncGenerator<TVal>(asyncGeneratorFn);
  };

  // static ==========================================-| from() |-====
  public static from<TVal>(boxedList: IUnboxList<TVal> | IUnbox<TVal[]>): BoxedAsyncGenerator<TVal> {
    return BoxedAsyncGenerator.of<TVal>(boxedList.unbox());
  }

  // static ==========================================-| from() |-====
  public static fromAsyncGen<TVal>(asyncGenerator: AsyncGenerator<TVal>): BoxedAsyncGenerator<TVal> {
    return new BoxedAsyncGenerator(() => asyncGenerator); // .of<TVal>(boxedList.unbox());
  }
  // static ============================================-| of() |-====
  public static of = <TVal>(...values: TVal[] | TVal[][]): BoxedAsyncGenerator<TVal> => {
    const arrayGenerator = (array: TVal[]): (() => AsyncGenerator<TVal>) =>
      async function* (): AsyncGenerator<TVal> {
        const array_ = array.map(i => immediateZalgo(i));
        for await (const iterator of array_) yield iterator;
      };

    if (values.length === 1) {
      const list = values[0];

      if (Array.isArray(list)) {
        return new BoxedAsyncGenerator<TVal>(arrayGenerator([...list]));
      }
    }

    return new BoxedAsyncGenerator<TVal>(arrayGenerator([...(values as TVal[])]));
  };

  // constructor ======================-| BoxedAsyncGenerator() |-====
  protected constructor(valueGenerator: () => AsyncGenerator<T>) {
    this.#valueAsyncGenerator = valueGenerator;
  }
  public mapAwait<R>(fn: Mapper<T, Promise<R> | R>, delay: number = 0): BoxedAsyncGenerator<Awaited<R>> {
    const asyncGenerator = this.#valueAsyncGenerator;
    async function* asyncGeneratorFn(): AsyncGenerator<Awaited<R>> {
      let index = 0;

      for await (const item of asyncGenerator()) {
        yield delay === 0 ? immediateZalgo(fn(item, index++)) : timeoutZalgo(fn(item, index++), delay);
      }
    }
    return BoxedAsyncGenerator.fromGen(asyncGeneratorFn);
  }

  public get asyncGen(): () => AsyncGenerator<T> {
    return this.#valueAsyncGenerator;
  }

  public unboxAsyncGen(): AsyncGenerator<T> {
    return this.asyncGen();
  }

  async *[Symbol.asyncIterator]() {
    return this.#valueAsyncGenerator
    // const asyncGenerator = this.#valueAsyncGenerator;
    // for await (const item of asyncGenerator()) {
    //   yield item;
    // }
  }
}

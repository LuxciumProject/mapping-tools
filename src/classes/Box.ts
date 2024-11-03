import type { MapperOptions, Settled, SettledLeft, SettledRight } from '../types';

export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;

  export default class Box <B> {
    private readonly _value: B;

    protected constructor(value: B) {
      this._value = value;
    }

    public static of<TVal>(value: TVal): Box<TVal> {
      return new Box<TVal>(value);
    }

    static from<BVal>(value: Box<BVal>) {
      return new Box(value.boxedValue);
    }

    public get boxedValue(): B {
      return this._value;
    }

    public unbox(): B {
      return this.boxedValue;
    }
  }

export class BBox<T, B extends Base<T> = Base<T>> {

  private readonly _value: B;

  public static of<TVal,B   extends Base<TVal> = Base<TVal>>(value: B) {
    return new  BBox(value);
  }
  protected constructor(value: B) {
    this._value = value;
  }
  public get boxedValue(): B {
    void this.fn_a1f9a
    return this._value;
  }

  /**
   * Placeholder for the fn_a1f9a function
   * @param mapperOptions
   */
  private fn_a1f9a<T, R>(mapperOptions: MapperOptions<T, R>) // : Promise<SettledLeft | SettledRight<R>>
  {
    void mapperOptions
  }

}

  /**
   * Maps the boxed value to a new value
   */
  // public abstract map<U>(fn: (value: B) => U): Box<U>;

  /**
   * Creates a new Box with the provided value
   */
  // public static of<TVal,B   extends Base<TVal> = Base<TVal>>(value: B) {

  //   void value
    // return new (class extends Box<TVal> {
    //   public map<U>(fn: (value: TVal) => U)  {
        // void fn
        // return Box.of(fn(this.value));
    //   }
    // })(value);
  // }

  // /**
  //  * Creates a new Box from an existing Box
  //  */
  // public static from<TVal,B   extends Base<TVal> = Base<TVal>>(box: Box<B>): Box<TVal> {
  //   return Box.of(box.getValue());
  // }

  /**
   * Chains multiple transformations
   */
  // public chain<U>(fn: (value:B) => Box<U>): Box<U> {
  //   return fn(this.getValue());
  // }

  // /**
  //  * Applies a function that may or may not return a Box
  //  */
  // public ap<U>(fn: Box<(value: B) => U>): Box<U> {
  //   return fn.map(f => f(this.getValue()));
  // }

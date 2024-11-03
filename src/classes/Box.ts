import type { MapperOptions, Settled, SettledLeft, SettledRight } from '../types';

export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;

export default class Box<B> {
  private readonly _value: B;

  protected constructor(value: B) {
    this._value = value;
  }

  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box<TVal>(value);
  }

  static from<BVal>(value: Box<BVal>): Box<BVal> {
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

  public static of<TVal, B extends Base<TVal> = Base<TVal>>(value: B): BBox<TVal, B> {
    return new BBox(value);
  }

  protected constructor(value: B) {
    this._value = value;
  }

  public get boxedValue(): B {
    void this.fn_a1f9a;
    return this._value;
  }

  /**
   * Placeholder for the fn_a1f9a function
   * @param mapperOptions
   */
  private fn_a1f9a<T, R>(mapperOptions: MapperOptions<T, R>): void {
    void mapperOptions;
  }
}

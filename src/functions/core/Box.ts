export abstract class Box {
  // properties and methods go here
}

// export interface Unboxable<T> {
//   unbox(): T;
// }

export type UnboxableFn<T, R> = Unboxable<(input: T) => R>;

// Assuming Unboxable interface is defined as:
interface Unboxable<T> {
  unbox(): T;
}

export class SpecialBox<T, R> implements Unboxable<(input: T) => R> {
  private readonly _fn: (input: T) => R;

  // Static factory method to create a new SpecialBox with a function
  static of<T, R>(fn: (input: T) => R): SpecialBox<T, R> {
    return new SpecialBox(fn);
  }

  static from<TVal, RVal>(
    box: UnboxableFn<TVal, RVal>
  ): SpecialBox<TVal, RVal> {
    return SpecialBox.of(box.unbox());
  }

  protected constructor(fn: (input: T) => R) {
    this._fn = fn;
  }

  // Method to apply a function to a value (pipe)
  public pipe<U>(nextFn: (input: R) => U): SpecialBox<T, U> {
    const composedFn = (input: T) => nextFn(this._fn(input));
    return new SpecialBox(composedFn);
  }

  // Method to compose functions (right-to-left composition)
  public compose<U>(prevFn: (input: U) => T): SpecialBox<U, R> {
    const composedFn = (input: U) => this._fn(prevFn(input));
    return new SpecialBox(composedFn);
  }

  // Unbox method to apply the composed function to a value
  public unbox(): (input: T) => R {
    return this._fn;
  }

  get fn(): (input: T) => R {
    return this._fn;
  }

  get value(): (input: T) => R {
    return this._fn;
  }
}

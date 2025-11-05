import type { Settled, SettledLeft, SettledRight } from "../../types";

export default class Box<B> {
  // A private readonly field to hold the boxed value of type B.
  // This ensures the value is immutable once assigned.
  private readonly _value: B;

  // Static factory method to create a new Box instance with a given value.
  // This allows controlled instantiation and ensures immutability by hiding the constructor.
  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box<TVal>(value);
  }

  // Static method to create a new Box instance from an existing Box instance.
  // This method provides a way to clone the value of an existing Box, creating a new Box with the same value.
  static from<BVal>(value: Box<BVal>): Box<BVal> {
    return new Box(value.unbox());
  }

  // Protected constructor to restrict direct instantiation of the class.
  // Instances can only be created using the static methods, enforcing controlled creation.
  protected constructor(value: B) {
    this._value = value;
  }

  // Public method to unbox the value stored in the Box.
  // This simply returns the value, providing an interface to access the boxed value.
  public unbox(): B {
    return this.boxedValue;
  }

  // Public getter to retrieve the boxed value.
  // This provides a read-only view of the value, ensuring the value cannot be modified externally.
  public get boxedValue(): B {
    return this._value;
  }
}

export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;

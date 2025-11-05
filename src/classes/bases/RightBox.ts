// @/class/bases/RightBox.ts
import { SettledRight } from '@/types';
/**
 * Represents a `RightBox` that specifically conforms to the structure
 * defined by `SettledRight<B>`, using generics to handle the fulfilled value type.
 *
 * @typeparam B - The type of the fulfilled value.
 *
 * @remarks
 * `RightBox` extends the concept of `SettledRight<B>` by encapsulating
 * fulfilled promise-like values and adding further structure.
 *
 * @public
 */
export class RightBox<B> implements SettledRight<B> {
  /**
   * The fulfilled value, following `SettledRight<B>`.
   */
  private _value: B;

  /**
   * The step in the transformation process.
   */
  private _transformStep: number;

  /**
   * The index of the promise in the set of settled promises.
   */
  private _index: number;

  /**
   * Creates a new instance of `RightBox<B>`.
   *
   * @param value - The fulfilled value.
   * @param transformStep - The step in the transformation process (defaults to `-1` if not provided).
   * @param index - The index of this box (defaults to `-1` if not provided).
   * @returns A new `RightBox<B>` instance.
   *
   * @public
   */
  public static ofof<BVal>(
    value: BVal,
    transformStep: number = -1,
    index: number = -1,
  ): RightBox<BVal> {
    return new RightBox(value, transformStep, index);
  }

  /**
   * Initializes a new instance of `RightBox<B>`.
   *
   * @param value - The fulfilled value.
   * @param transformStep - The step in the transformation process.
   * @param index - The index of this box.
   *
   * @protected
   */
  protected constructor(
    value: B,
    transformStep: number,
    index: number,
  ) {
    this._value = value;
    this._transformStep = transformStep;
    this._index = index;

    // When transformStep is -1, the following properties are not enumerated.
    if (this._transformStep !== -1) {
      Object.defineProperty(this, "transformStep", {
        value: this._transformStep,
        enumerable: true,
        configurable: true,
      });
    }

    if (this._index !== -1) {
      Object.defineProperty(this, 'index', {
        value: this._index,
        enumerable: true,
        configurable: true,
      });
    }
  }

  /**
   * Converts the `RightBox<B>` instance into a `SettledRight<B>` object.
   *
   * @returns An object conforming to `SettledRight<B>`.
   */
  public unbox(): SettledRight<B> {
    return {
      status: this.status,
      value: this.value,
      fulfilled: this.fulfilled,
      transformStep: this.transformStep,
      currentRejection: this.currentRejection,
      index: this.index,
      reason: null as never,
      rejected: null as never,
    };
  }

  /**
   * The status of the promise, which is always set to `'fulfilled'`.
   */
  public get status(): "fulfilled" {
    return "fulfilled";
  }

  /**
   * The fulfilled value.
   */
  public get value(): B {
    return this._value;
  }

  /**
   * The fulfilled value. Alias for `value`.
   */
  public get fulfilled(): B {
    return this._value;
  }

  /**
   * The step in the transformation process.
   */
  public get transformStep(): number {
    return this._transformStep;
  }

  /**
   * The current rejection status, always `null` for `RightBox`.
   */
  public get currentRejection(): null {
    return null;
  }

  /**
   * The index of this box in the collection of boxes.
   */
  public get index(): number {
    return this._index;
  }

  /**
   * The reason for rejection. Always `never` for a fulfilled value.
   */
  public reason = null as never;

  /**
   * The rejected value. Always `never` for a fulfilled value.
   */
  public rejected = null as never;
}

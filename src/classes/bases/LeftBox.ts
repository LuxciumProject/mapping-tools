import { SettledLeft } from "types";

/**
 * Represents a `LeftBox` that specifically conforms to the structure
 * defined by `SettledLeft`, without using generics.
 *
 * @remarks
 * `LeftBox` extends the concept of `SettledLeft` by encapsulating
 * rejected promise-like values and adding further structure.
 *
 * @public
 */
export class LeftBox {
  /**
   * The reason for rejection, following `SettledLeft`.
   */
  private _reason: any;

  /**
   * The step in the transformation process.
   */
  private _transformStep: number;

  /**
   * The current rejection status. Can be `true`, `false`, or `undefined` but the property itself is always defined.
   */
  private _currentRejection: false | true | undefined;

  /**
   * The index of the promise in the set of settled promises.
   */
  private _index: number;

  /**
   * Creates a new instance of `LeftBox`.
   *
   * @param reason - The reason for rejection.
   * @param transformStep - The step in the transformation process (defaults to `-1` if not provided).
   * @param currentRejection - The current rejection status.
   * @param index - The index of this box (defaults to `-1` if not provided).
   * @returns A new `LeftBox` instance.
   *
   * @public
   */
  public static of(
    reason: any,
    transformStep: number = -1,
    currentRejection: false | true = true,
    index: number = -1,
  ): LeftBox {
    return new LeftBox(reason, transformStep, currentRejection, index);
  }

  /**
   * Initializes a new instance of `LeftBox`.
   *
   * @param reason - The reason for rejection.
   * @param transformStep - The step in the transformation process.
   * @param currentRejection - The current rejection status.
   * @param index - The index of this box.
   *
   * @protected
   */
  protected constructor(
    reason: any,
    transformStep: number,
    currentRejection: false | true | undefined,
    index: number,
  ) {
    this._reason = reason;
    this._transformStep = transformStep;
    this._currentRejection = currentRejection;
    this._index = index;

    // When value is -1, the following properties are not enumerated.
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

  public unbox(): SettledLeft {
    return {
      status: this.status,
      reason: this.reason,
      rejected: this.rejected,
      transformStep: this.transformStep,
      currentRejection: this.currentRejection,
      index: this.index,
      value: null as never,
      fulfilled: null as never,
    };
  }

  /**
   * The status of the promise, which is always set to `'rejected'`.
   */
  public get status(): "rejected" {
    return "rejected";
  }

  /**
   * The reason for the rejection.
   */
  public get reason(): any {
    return this._reason;
  }

  /**
   * The rejected value.
   */
  public get rejected(): any {
    return this._reason;
  }

  /**
   * The step in the transformation process.
   */
  public get transformStep(): number {
    return this._transformStep;
  }

  /**
   * The current rejection status.
   */
  public get currentRejection(): false | true | undefined {
    return this._currentRejection;
  }

  /**
   * The index of this box in the collection of boxes.
   */
  public get index(): number {
    return this._index;
  }

  public value = null as never;
  public fulfilled = null as never;
}

/**
 * The type SettledLeft extends PromiseRejectedResult adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @group Base Types
 * @public
 */

/**
 * Represents the left side of a settled promise.
 * This type is a combination of `PromiseRejectedResult` and additional properties.
 *
 * @remarks
 * The `SettledLeft` type is used to describe the rejected state of a promise in a specific context.
 * It includes properties such as the reason for rejection, the transform step, and the index.
 *
 * @public
 */

export type SettledLeft = PromiseRejectedResult & {
  /**
   * The status of the promise, which is always set to `'rejected'`.
   */
  status: "rejected";
  /**
   * The reason for the rejection.
   */
  reason: any;
  /**
   * The value of the promise, which is always `never` for a rejected promise.
   */
  // value: never;
  /**
   * The rejected value.
   */
  rejected: any;
  /**
   * The fulfilled value, which is always `null` for a rejected promise.
   */
  // fulfilled: never;
  /**
   * The step in the transformation process.
   */
  transformStep: number;
  /**
   * The current rejection status.
   */
  currentRejection: false | true | undefined;
  /**
   * The index of the promise in the set of settled promises.
   */
  index: number;
};
/**
 * Represents the left side of a settled promise.
 * This type is a combination of `PromiseRejectedResult` and additional properties.
 *
 * @remarks
 * The `SettledLeft` type is used to describe the rejected state of a promise in a specific context.
 * It includes properties such as the reason for rejection, the transform step, and the index.
 *
 * @public
 */
export default class LeftBox implements SettledLeft {
  private readonly _reason: any;
  private readonly _rejected: any;
  private readonly _transformStep: number;
  private readonly _currentRejection: false | true | undefined;
  private readonly _index: number;
  protected constructor(
    {
      reason = undefined,
      transformStep = -1,
      currentRejection = true,
      index = -1,
    }: {
      reason: any;
      transformStep: number;
      currentRejection: false | true | undefined;
      index: number;
    },
  ) {
    this._reason = reason;
    this._rejected = reason;
    this._transformStep = transformStep;
    this._currentRejection = currentRejection;
    this._index = index;
  }
  public unbox(): SettledLeft {
    return {
      status: this.status,
      reason: this.reason,
      rejected: this.rejected,
      transformStep: this.transformStep,
      currentRejection: this.currentRejection,
      index: this.index,
    };
  }
  public get boxedReason(): any {
    return this.reason;
  }
  /**
   * The status of the promise, which is always set to `'rejected'`.
   */
  get status(): "rejected" {
    return "rejected";
  }
  /**
   * The reason for the rejection.
   */
  get reason(): any {
    return this._reason;
  }
  /**
   * The rejected value.
   */
  get rejected(): any {
    return this._rejected;
  }
  /**
   * The step in the transformation process.
   */
  get transformStep(): number {
    return this._transformStep;
  }
  /**
   * The current rejection status.
   */
  get currentRejection(): false | true | undefined {
    return this._currentRejection;
  }
  /**
   * The index of the promise in the set of settled promises.
   */
  get index(): number {
    return this._index;
  }
  static from(leftBox: LeftBox) {
    return LeftBox.of(leftBox.unbox());
  }
  public static of(
    reason: any,
    currentRejection: false | true | undefined = true,
    transformStep?: number,
    index?: number,
  ): LeftBox {
    return new LeftBox({
      reason,
      transformStep: transformStep || -1,
      currentRejection: currentRejection || true,
      index: index || -1,
    });
  }
}

export type LeftBoxType = WithStatus & {
  readonly reason: any;
  readonly rejected: any;
  readonly transformStep: number;
  readonly currentRejection: false | true | undefined;
  readonly index: number;
  unbox(): SettledLeft;
  readonly boxedReason: any;
};

LeftBox;
export type WithIndexAndStep = {
  transformStep: number;
  index: number;
};
export type WithRejection = {
  status: "rejected";
  currentRejection: false | true;
};
export type AtCurrentRejection = LeftBox & {
  status: "rejected";
  currentRejection: true;
};
export type PreviousRejection = LeftBox & {
  status: "rejected";
  currentRejection: false;
};
export type NoRejection = {
  status: "rejected" | "fulfilled";
  currentRejection: undefined;
};
export type RejectedStatus = {
  status: "rejected";
};
export type FulfilledStatus = {
  status: "fulfilled";
};
export type WithStatus =
  | RejectedStatus
  | FulfilledStatus;

interface DemoClassTrueInterface {
  readonly flag: true;
}

interface DemoClassFalseInterface {
  readonly flag: false;
}

type DemoClassOptions = {
  value: string;
  flag?: boolean;
};

class DemoClass {
  private constructor(
    private readonly _value: string,
    public readonly flag: boolean,
  ) {}

  // Overloaded static factory method 'of' to create an instance of DemoClass.
  static of(value: string, flag: true): DemoClass & DemoClassTrueInterface;
  static of(value: string, flag: false): DemoClass & DemoClassFalseInterface;
  static of(
    options: DemoClassOptions & { flag: true },
  ): DemoClass & DemoClassTrueInterface;
  static of(
    options: DemoClassOptions & { flag: false },
  ): DemoClass & DemoClassFalseInterface;
  static of(
    valueOrOptions: string | DemoClassOptions,
    flag?: boolean,
  ): DemoClass {
    if (typeof valueOrOptions === "string") {
      return new DemoClass(valueOrOptions, flag ?? false);
    } else {
      return new DemoClass(valueOrOptions.value, valueOrOptions.flag ?? false);
    }
  }

  public get value(): string {
    return this._value;
  }
}

// Usage example:
const instance1 = DemoClass.of("Hello, world!", false);
console.log(instance1.value); // Output: Hello, world!
console.log(instance1.flag); // Output: false

const instance2 = DemoClass.of({ value: "Hello, TypeScript!", flag: true });
console.log(instance2.value); // Output: Hello, TypeScript!
console.log(instance2.flag); // Output: true

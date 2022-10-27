class Nothing<T> {
  public static of<TVal>(val?: TVal) {
    return new Nothing(val);
  }

  #value: T | undefined;

  public constructor(val?: T) {
    this.#value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return this.#value !== undefined
      ? new Nothing<TMap>(fn(this.#value))
      : new Nothing<TMap>(this.#value as any);
  }
}

class Just<T> {
  public static of<TVal>(val: TVal) {
    return new Just(val);
  }

  #value: T;

  public constructor(val: T) {
    this.#value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return new Just<TMap>(fn(this.#value));
  }
}

export type Either<T1, T2> = Just<T1> | Nothing<T2>;
export type PromiseSettledEither<T> = Either<T, any>;

export function promiseSettledEither<T>(
  promiseSettledResult: PromiseSettledResult<T>
): PromiseSettledEither<T> {
  if (promiseSettledResult.status === 'fulfilled') {
    return Just.of(promiseSettledResult.value);
  }

  if (promiseSettledResult.status === 'rejected') {
    return Nothing.of(promiseSettledResult.reason);
  }

  throw new Error('NEVER');
}

interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;

export interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved with an array of results when all
   * of the provided Promises resolve or reject.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  allSettled<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }>;

  /**
   * Creates a Promise that is resolved with an array of results when all
   * of the provided Promises resolve or reject.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  allSettled<T>(
    values: Iterable<T | PromiseLike<T>>
  ): Promise<PromiseSettledResult<Awaited<T>>[]>;
}

/*
an array called list denoted by []
a boxing type with function of and from
a boxing type with function map
a boxing type with a function named unbox or a property named value
a boxing type with a chain function map then unbox
a box of function passed to an apply function

 */

export interface IBox<T> {
  // static of

  // static from
  value: T;
  map<R>(fn: (val: T) => R): IBox<R>;
  unbox(): T;
  chain<R>(fn: (val: T) => R): R;
  apply<R>(c: IBox<(val: T) => R>): IBox<R>;
}

export type TBoxedList<T> = IBox<T[]>;

export class SimpleBox<T> implements IBox<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
  map<R>(fn: (val: T) => R): IBox<R> {
    return new SimpleBox(fn(this.value));
  }
  unbox(): T {
    return this.value;
  }
  chain<R>(fn: (val: T) => R): R {
    return fn(this.value);
  }
  apply<R>(c: IBox<(val: T) => R>): IBox<R> {
    const facon1 = this.map(i => c.map(fn => fn(i)));
    const facon2 = c.map(fn => this.map(i => fn(i)));

    void facon1, facon2;
    return c.map(fn => this.map<R>(fn)).unbox();
  }
}

export function id<T>(value: any): T {
  return value;
}

export function double(value: any): any {
  return value * 2;
}

export function len(value: any): any {
  return value.length;
}

export function functionReducer<A, B>(list: [(...x: any[]) => unknown]) {
  return [
    list.reduce(
      (fn0, fn2): any =>
        (x: any): any =>
          fn0(fn2(x)),
      id
    ),
  ] as any as (x: A) => B;
}

export function double_typed(value: number): number {
  return value * 2;
}

//void 'something B'
// (value: T): any =>
//   fns.reduce((acc:any, fn:(arg: any) => any): T => fn(acc ), value) as any as (arg: T) => R;

// fns.push(fnOrValue as (arg: T) => R);
// return fnOrValue;
const list1 = [id, double, len, id];
const list2 = [id, len, double, id];
export const pipe2 =
  <T, R>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value) as any as (arg: T) => R;

const fnX = list1.reduce(
  (fn0, fn2): any =>
    (x: any): any =>
      fn0(fn2(x)),
  id
);
console.log('fnX', fnX('toto'));

const res1 = pipe2(...list2)('toto');
void res1;

console.log('pip2', pipe2(...list2)('toto'));
console.log('pip2', pipe2(...list2)('toto'));

export function pipe_<T, R>(fnOrValue: ((arg: T) => R) | T): any {
  if (typeof fnOrValue === 'function' && fnOrValue instanceof Function) {
    console.log(`fnOrValue is a function "${fnOrValue}"`);
    return <A = T, B = R>(fnOrValue_: A | ((arg: A) => B)) =>
      fnOrValue(pipe_<A, B>(fnOrValue_));
  }

  console.log(`fnOrValue is the value "${fnOrValue}"`);
  return fnOrValue;
}
// ( |<A = T>(fnOrValue_: A)=>R)   R | ((val: T) => R) <T, R>
// <A, B>(val: A) => fnOrValue(protoPipe<A, B>(val));
export type FMap<T, R> = (val: T) => R;

export function pipe(fnOrValue: any) {
  if (typeof fnOrValue === 'function' && fnOrValue instanceof Function) {
    console.log(`fnOrValue is a function "${fnOrValue}"`);
    return (fnOrValue_: any) => {
      if (typeof fnOrValue_ === 'function' && fnOrValue_ instanceof Function) {
        console.log(`pipe called with another function "${fnOrValue_}"`);
        return pipe((x: any) => {
          const y = fnOrValue(x);
          console.log(`pipe intermediate result "${y}" of type 'R'`);
          return fnOrValue_(y);
        });
      }
      console.log(`pipe called with value "${fnOrValue_}" of type 'T'`);
      return fnOrValue(fnOrValue_);
    };
  }
  console.log(`fnOrValue is the value "${fnOrValue}" of type 'T'`);
  return fnOrValue;
}

console.log(id_(len_(id_('TATA'))));
const step1 = pipe(id_);
const step2 = step1(len_);
const step3 = step2(id_);
const step4 = step3('TATA');
console.log('pipe_x:', step4);
export function id_<T>(value: T): T {
  return value;
}
export function len_(value: any): any {
  return value.length;
}
export function double_(value: any): any {
  return value * 2;
}

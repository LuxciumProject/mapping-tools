import {
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseSettledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { getTransformStep } from '../../helpers/tools';
import type {
  Base,
  BaseOrDeferred,
  Settled,
  SettledLeft,
  SettledRight,
} from '../../types';
import type { Deferred } from '../../types/MainTypes';
import { makeFulfillement } from './makeFulfillement';
import { makeRejection } from './makeRejection';

/** @internal */
export const getSettler = async <T>(item: BaseOrDeferred<T>, index: number) =>
  makeSettler<T>(isPromiseLike(item) ? await item : item, index);

/*
      | PromiseLike<SettledRight<T>> Promise<SettledRight<T>>
      | PromiseLike<SettledLeft> Promise<SettledLeft>
      | PromiseLike<Settled<T>> Promise<Settled<T>>
      | PromiseLike<PromiseFulfilledResult<T>> Promise<SettledRight<T>>
      | PromiseLike<PromiseRejectedResult> Promise<SettledLeft>
      | PromiseLike<PromiseSettledResult<T>> Promise<Settled<T>>
      | PromiseLike<T> Promise<SettledRight<T>>
      // INFO: Below are the non Promise like types ------------------------
      | SettledRight<T> SettledRight<T>
      | SettledLeft SettledLeft
      | Settled<T> Settled<T>
      | PromiseFulfilledResult<T> SettledRight<T>
      | PromiseRejectedResult SettledLeft
      | PromiseSettledResult<T> Settled<T>
      | T SettledRight<T>
// INFO: Below are the PromiseLike types -----------------------------
export function makeSettler<T>(
  item: PromiseLike<SettledRight<T>>,
  index?: number
): Promise<SettledRight<T>>;
export function makeSettler (
  item: PromiseLike<SettledLeft>,
  index?: number
): Promise<SettledLeft>;
export function makeSettler<T>(
  item: PromiseLike<Settled<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseFulfilledResult<T>>,
  index?: number
): Promise<SettledRight<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseRejectedResult>,
  index?: number
): Promise<SettledLeft>;
export function makeSettler<T>(
  item: PromiseLike<PromiseSettledResult<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<T>,
  index?: number
): Promise<SettledRight<T>>;
// INFO: Below are the non Promise like types ------------------------
export function makeSettler<T>(
  item: SettledRight<T>,
  index?: number
): SettledRight<T>;
export function makeSettler(
  item: SettledLeft,
  index?: number
): SettledLeft;
export function makeSettler<T>(
  item: Settled<T>,
  index?: number
): Settled<T>;
export function makeSettler<T>(
  item: PromiseFulfilledResult<T>,
  index?: number
): SettledRight<T>;
export function makeSettler(
  item: PromiseRejectedResult,
  index?: number
): SettledLeft;
export function makeSettler<T>(
  item: PromiseSettledResult<T>,
  index?: number
): Settled<T>;
export function makeSettler<T>(
  item: T,
  index?: number
): SettledRight<T>;

 */
/** @internal */
// INFO: Below are the PromiseLike types -----------------------------
// export function makeSettler<T>(
//   item: PromiseLike<SettledRight<T>>,
//   index?: number
// ): Promise<SettledRight<T>>;
// export function makeSettler<T>(
//   item: PromiseLike<PromiseFulfilledResult<T>>,
//   index?: number
// ): Promise<SettledRight<T>>;
// export function makeSettler<T>(
//   item: PromiseLike<PromiseRejectedResult | SettledLeft>,
//   index?: number
// ): Promise<SettledLeft>;
// export function makeSettler<T>(
//   item: PromiseLike<PromiseSettledResult<T> | Settled<T>>,
//   index?: number
// ): Promise<Settled<T>>;
// export function makeSettler<T>(
//   item: PromiseLike<T>,
//   index?: number
// ): Promise<SettledRight<T>>;
// // INFO: Below are the non Promise like types ------------------------
// export function makeSettler<T>(
//   item: PromiseFulfilledResult<T> | SettledRight<T>,
//   index?: number
// ): SettledRight<T>;
// export function makeSettler<T>(
//   item: PromiseRejectedResult | SettledLeft,
//   index?: number
// ): SettledLeft;
// export function makeSettler<T>(
//   item: PromiseSettledResult<T> | Settled<T>,
//   index?: number
// ): Settled<T>;
// export function makeSettler<T>(item: T, index?: number): SettledRight<T>;
// export function makeSettler<T>(
//   item:
//     | PromiseFulfilledResult<T>
//     | PromiseLike<PromiseFulfilledResult<T>>
//     | PromiseLike<T>
//     | T,
//   index?: number
// ): Promise<SettledRight<T>> | SettledRight<T>;
// export function makeSettler<T>(
//   item: PromiseLike<PromiseRejectedResult> | PromiseRejectedResult,
//   index?: number
// ): Promise<SettledLeft> | SettledLeft;
// export function makeSettler<T>(
//   item:
//     | PromiseLike<PromiseSettledResult<T>>
//     | PromiseLike<T>
//     | PromiseSettledResult<T>
//     | T,
//   index?: number
// ): Promise<Settled<T>> | Settled<T>;
export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export function applyToArray<T, U>(array: T[], func: (item: T) => U): U[] {
  return array.map(func);
}
export type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;
export type UnwrapSettled<T> = T extends Settled<infer U> ? U : T;
export type UnwrapSettledRight<T> = T extends SettledRight<infer U> ? U : T;
export type UnwrapSettledLeft = SettledLeft;
// Assuming SettledLeft does not have a generic parameter
export type UnwrapPromiseFulfilledResult<T> =
  T extends PromiseFulfilledResult<infer U> ? U : T;
export type UnwrapPromiseRejectedResult = PromiseRejectedResult;
// Assuming PromiseRejectedResult does not have a generic parameter
export type UnwrapPromiseSettledResult<T> =
  T extends PromiseSettledResult<infer U> ? U : T;

// INFO: Below are the PromiseLike types -----------------------------
export function makeSettler<T>(
  item: PromiseLike<SettledRight<T>>,
  index?: number
): Promise<SettledRight<T>>;
export function makeSettler(
  item: PromiseLike<SettledLeft>,
  index?: number
): Promise<SettledLeft>;
export function makeSettler<T>(
  item: PromiseLike<Settled<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseFulfilledResult<T>>,
  index?: number
): Promise<SettledRight<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseRejectedResult>,
  index?: number
): Promise<SettledLeft>;
export function makeSettler<T>(
  item: PromiseLike<PromiseSettledResult<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<T>,
  index?: number
): Promise<SettledRight<T>>;
// Deferred<T>
export function makeSettler<T>(
  item: Deferred<T>,
  index?: number
): Promise<Settled<T>>;
// INFO: Below are the non Promise like types ------------------------
export function makeSettler<T>(
  item: SettledRight<T>,
  index?: number
): SettledRight<T>;
export function makeSettler(item: SettledLeft, index?: number): SettledLeft;
export function makeSettler<T>(item: Settled<T>, index?: number): Settled<T>;
export function makeSettler<T>(
  item: PromiseFulfilledResult<T>,
  index?: number
): SettledRight<T>;
export function makeSettler(
  item: PromiseRejectedResult,
  index?: number
): SettledLeft;
export function makeSettler<T>(
  item: PromiseSettledResult<T>,
  index?: number
): Settled<T>;
export function makeSettler<T>(item: T, index?: number): SettledRight<T>;
export function makeSettler<T>(item: Base<T>, index?: number): Settled<T>;
// FUNC DEF:(makeSettler<T>) --------------------------------------------
// eslint-disable-next-line
export function makeSettler(
  item: Deferred<any> | any,
  index = -1
): Promise<Settled<any>> | Settled<any> {
  return isPromiseLike(item)
    ? (async () => makeSettler_(await item, index))()
    : makeSettler_(item, index);
}
// FUNC DEF:(makeSettler_<T>) ----------------------------------------
/** @internal */
function makeSettler_<T>(item: Base<T>, index: number): Settled<T> {
  const itemTransformStep = getTransformStep(item, 0);
  let transformStep = -1;
  if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
    let itemValue: T;
    let base: { value: T; status: 'fulfilled' };
    if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
      transformStep = itemTransformStep;
      itemValue = item.value;
      base = item;
    } else {
      transformStep = 0;
      itemValue = item;
      base = { value: itemValue, status: 'fulfilled' };
    }
    return makeFulfillement<T>({
      value: itemValue,
      index,
      transformStep: transformStep,
      base,
    });
  }
  const base: { reason: any; status: 'rejected' } = item;
  const { reason } = item;
  transformStep = getTransformStep(item, 0);
  return makeRejection({
    reason,
    index,
    transformStep,
    currentRejection: false,
    base,
  });
}
// TASK LIST: [TODO] (Review Documentation) --------------------------

// // INFO: Below are the PromiseLike types -----------------------------
// public static of  <T>(
//   item: PromiseLike<PromiseSettledResult<T> | Settled<T> | T>,
//   ): Promise<Settled<T>>;
// public static of  <T>(
//   item: PromiseLike<PromiseFulfilledResult<T> | SettledRight<T> | T>,
//   ): Promise<SettledRight<T>>;
// public static of  <T>(
//   item: PromiseLike<PromiseRejectedResult | SettledLeft>,
//   ): Promise<SettledLeft>;
// public static of  <T>(
//   item: PromiseLike<T>,
//   ): Promise<SettledRight<T>>;
// // INFO: Below are the non Promise like types ------------------------
//  public static of  <T>(
//   item: PromiseSettledResult<T> | Settled<T> | T,
//   ): Settled<T>;
// public static of  <T>(
//   item: PromiseFulfilledResult<T> | SettledRight<T> | T,
//   ): SettledRight<T>;
// public static of  <T>(
//   item: PromiseRejectedResult | SettledLeft,
//   ): SettledLeft;
// public static of  <T>(item: T, : SettledRight<T>;
// public static of  <T>(
//   item:
//     | PromiseFulfilledResult<T>
//     | PromiseLike<PromiseFulfilledResult<T>>
//     | PromiseLike<T>
//     | T,
//   ): Promise<SettledRight<T>> | SettledRight<T>;
// public static of  <T>(
//   item: PromiseLike<PromiseRejectedResult> | PromiseRejectedResult,
//   ): Promise<SettledLeft> | SettledLeft;
// public static of  <T>(
//   item:
//     | PromiseLike<PromiseSettledResult<T>>
//     | PromiseLike<T>
//     | PromiseSettledResult<T>
//     | T,
//   ): Promise<Settled<T>> | Settled<T>;
// // public static of<T>(
// //   item:
// //     | T
// //     | PromiseLike<T>
// //     | Settled<T>
// //     | PromiseLike<Settled<T>>
// //     | PromiseSettledResult<T>
// //     | PromiseLike<PromiseSettledResult<T>>
// //     | SettledRight<T>
// //     | PromiseLike<SettledRight<T>>
// //     | PromiseFulfilledResult<T>
// //     | PromiseLike<PromiseFulfilledResult<T>>
// //     | SettledLeft
// //     | PromiseLike<SettledLeft>
// //     | PromiseRejectedResult
// //     | PromiseLike<PromiseRejectedResult>,
// //   // ):
// //   | Settled<T>
// //   | Promise<Settled<T>>
// //   | SettledRight<T>
// //   | Promise<SettledRight<T>>
// //   | SettledLeft
// //   | Promise<SettledLeft>;
// public static of  <T>(
//   item: // ??? Some Type based on T ???
// ): Promise<???> | Settled<???> {
//   // ...
// }

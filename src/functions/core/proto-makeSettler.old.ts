import { isPromiseLike } from '../../helpers/assertions';
import type { Settled, SettledLeft, SettledRight } from '../../types';
import { makeSettler_ } from './makeSettler';

// ::
// export function proto_makeSettler<T>(
//   item: PromiseLike<T> | T,
//   index?: number
// ): Promise<SettledRight<T>> | SettledRight<T>;
// | PromiseSettledResult<TVal>
// | Settled<TVal>
// | SettledLeft
// | SettledRight<TVal>

export function makeSettler<T>(
  item: PromiseLike<Settled<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseFulfilledResult<T> | SettledRight<T>>,
  index?: number
): Promise<SettledRight<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseRejectedResult | SettledLeft>,
  index?: number
): Promise<SettledLeft>;
export function makeSettler<T>(
  item: PromiseLike<T>,
  index?: number
): Promise<SettledRight<T>>;
export function makeSettler<T>(item: Settled<T>, index?: number): Settled<T>;
export function makeSettler<T>(
  item: PromiseFulfilledResult<T> | SettledRight<T>,
  index?: number
): SettledRight<T>;
export function makeSettler<T>(
  item: PromiseRejectedResult | SettledLeft,
  index?: number
): SettledLeft;
export function makeSettler<T>(item: T, index?: number): SettledRight<T>;
// FUNC DEF:(makeSettler<T>) ========================================//
// eslint-disable-next-line
export function makeSettler(
  item: unknown,
  index = -1
): Promise<Settled<unknown>> | Settled<unknown> {
  return isPromiseLike(item)
    ? (async () => makeSettler_(await item, index))()
    : makeSettler_(item, index);
}
// ::
// // istambul ignore
// export const getSettler = async <T>(item: BaseOrDeferred<T>, index: number) =>
//   proto_makeSettler(isPromiseLike(item) ? await item : item, index);
// ::

// function makeSettler_<T>(item: Base<T>, index: number): Settled<T> {
//   const itemTransformStep = getTransformStep(item, 0);
//   let transformStep = -1;
//   if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
//     let itemValue: T;
//     let base: { value: T; status: 'fulfilled' };
//     if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
//       transformStep = itemTransformStep;
//       itemValue = item.value;
//       base = item;
//     } else {
//       transformStep = 0;
//       itemValue = item;
//       base = { value: itemValue, status: 'fulfilled' };
//     }
//     return makeFulfillement<T>({
//       value: itemValue,
//       index,
//       transformStep: transformStep,
//       base,
//     });
//   }
//   const base: { reason: any; status: 'rejected' } = item;
//   const { reason } = item;
//   transformStep = getTransformStep(item, 0);
//   return makeRejection({
//     reason,
//     index,
//     transformStep,
//     currentRejection: false,
//     base,
//   });
// }

// ::

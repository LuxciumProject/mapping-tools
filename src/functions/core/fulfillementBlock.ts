import { isPromiseLike } from '../../helpers/assertions';
import { LookupFn, SettledRight, TransformFn, ValidateFn } from '../../types';
import { makeFulfillement } from './makeFulfillement';
// FUNC DEF:(fulfillementBlock<T, R>) ----------------------------------------
/** @internal */
export async function fulfillementBlock<T, R>(
  item: SettledRight<T>,
  index: number,
  array: any,
  transformFn: TransformFn<T, R> = async value => value as any as R,
  lookupFn: LookupFn<T, R> = (value, index, array) =>
    void [value, index, array],
  validateFn: ValidateFn<T, R> = async (value, index, array) =>
    void [value, index, array]
) {
  const transformation = transformFn(item.value, index, array);
  const value = isPromiseLike(transformation)
    ? await transformation
    : transformation;
  void lookupFn(value, index, array);
  await validateFn(value, index, array);
  let { transformStep } = item;
  transformStep++;
  return makeFulfillement<R>({ value, index, transformStep });
}

// TASK LIST: [TODO] (Review Documentation) -------------------------- /usr/bin/ionice /usr/bin/nice

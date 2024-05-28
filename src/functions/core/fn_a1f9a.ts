import { assertions } from '../../helpers';
import { getTransformStep } from '../../helpers/tools';
import type { MapperOptions, Settled } from '../../types';
import { defaultMapperOptions } from './defaultMapperOptions';
import { fulfillementBlock } from './fulfillementBlock';
import { makeRejection } from './makeRejection';
import { getSettler } from './makeSettler';

const {
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPromiseSettledResult,
} = assertions;

// FUNC DEF:(fn_a1f9a<T, R>) -----------------------------------------
/** @internal */
export async function fn_a1f9a<T, R>(mapperOptions: MapperOptions<T, R>) {
  const { item, index, array } = mapperOptions;
  const transformStep = getTransformStep(item, 0);
  const myItem: Settled<T> = await getSettler(item, mapperOptions.index);
  const { transform, lookup, validate, errLookup }: MapperOptions<T, R> =
    defaultMapperOptions<T, R>(mapperOptions);
  try {
    if (!isPromiseSettledResult(myItem) || isPromiseFulfilledResult(myItem)) {
      return await fulfillementBlock<T, R>(
        myItem,
        index,
        array,
        transform,
        lookup,
        validate
      );
    }
    if (isPromiseRejectedResult(myItem)) {
      const currentRejection = false;
      const { reason } = myItem;
      errLookup(reason, index, currentRejection);
      return makeRejection({
        reason,
        index,
        transformStep: getTransformStep(myItem, 0),
        currentRejection,
        base: myItem,
      });
    }
    /* istanbul ignore next */
    assertNever(myItem);
  } catch (error) {
    const currentRejection = true;
    errLookup(error, index, currentRejection);
    return makeRejection({
      reason: error,
      index,
      transformStep,
      currentRejection,
      base: myItem,
    });
  }
}

/* istanbul ignore next */
export function assertNever(myItem: never): never {
  throw new TypeError(
    `NEVER: item (${myItem}) is not assignable to type 'never'`
  );
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

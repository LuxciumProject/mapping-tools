import { assertions } from '../../helpers';
import { isPromiseLike } from '../../helpers/assertions';
import { getTransformStep } from '../../helpers/tools';
import { MapperOptions, Settled } from '../../types';
import { fulfillementBlock } from './fulfillementBlock';
import { makeRejection } from './makeRejection';
import { makeSettler } from './makeSettler';

const {
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPromiseSettledResult,
} = assertions;

// FUNC DEF:(fn_a1f9a<T, R>) -----------------------------------------
/** @internal */
export async function fn_a1f9a<T, R>({
  item,
  index,
  array,
  transform = async value => value as any as R,
  lookup = (value, index, array) => void [value, index, array],
  validate = async (value, index, array) => void [value, index, array],
  errLookup = (value, index, currentRejection) =>
    void [value, index, currentRejection],
}: MapperOptions<T, R>) {
  const transformStep = getTransformStep(item, 0);
  const myItem: Settled<T> = makeSettler(
    isPromiseLike(item) ? await item : item,
    index
  );
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
      void errLookup(reason, index, currentRejection);
      return makeRejection({
        reason,
        index,
        transformStep: getTransformStep(myItem, 0),
        currentRejection,
        base: myItem,
      });
    }
    /* istanbul ignore next */
    throw new TypeError(
      `NEVER: item (${myItem}) is not assignable to type 'never'`
    );
  } catch (error) {
    const currentRejection = true;
    void errLookup(error, index, currentRejection);
    return makeRejection({
      reason: error,
      index,
      transformStep,
      currentRejection,
      base: myItem,
    });
  }
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

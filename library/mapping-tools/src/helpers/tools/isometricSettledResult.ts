import { FULFILLED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';

/** @beta */

export function isometricSettledResult<T>(
  item: PromiseSettledResult<T>,
  index: number = -1
): Settled<T> {
  if (item.status === FULFILLED) {
    const settled: SettledRight<T> = {
      status: item.status,
      value: item.value,
      reason: undefined,
      fulfilled: item.value,
      rejected: null,
      currentRejection: null,
      recipeSteps: -1,
      index,
    };
    return settled;
  }
  const settled: SettledLeft = {
    status: item.status,
    reason: item.reason,
    value: undefined,
    rejected: item.reason,
    fulfilled: null,
    currentRejection: undefined,
    recipeSteps: -1,
    index,
  };
  return settled;
}
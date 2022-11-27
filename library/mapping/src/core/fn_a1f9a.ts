import { FULFILLED, REJECTED } from '../constants';
import {
  is_FulfilledResult,
  is_RejectedResult,
  is_SettledResult,
} from '../helper';
import { SettledLeft, SettledRight } from '../types';
import { MapperOptions } from '../types';

export async function fn_a1f9a<T, R>({
  item,
  index,
  array,
  transform = async v => v as any as R,
  lookup = v => void v,
  validate = async v => void v,
  errLookup = v => void v,
}: MapperOptions<T, R>) {
  try {
    if (!is_SettledResult(item) || is_FulfilledResult(item)) {
      let itemValue: T;
      if (is_FulfilledResult<T>(item)) {
        itemValue = item.value;
      } else {
        itemValue = item;
      }
      const value = await transform(itemValue, index, array);
      lookup(value, index);
      await validate(value, index);
      const result: SettledRight<R> = {
        status: FULFILLED,
        value,
        fulfilled: value,
        rejected: null,
        index,
      };
      return result;
    }
    if (is_RejectedResult(item)) {
      const { reason } = item;
      errLookup(reason, index, false);

      const result: SettledLeft = {
        status: REJECTED,
        reason,
        rejected: reason,
        fulfilled: null,
        index,
      };
      return result;
    }
    throw new TypeError(
      `NEVER: item (${item}) is not assignable to type 'never'`
    );
  } catch (reason) {
    errLookup(reason, index, true);
    const result: SettledLeft = {
      status: REJECTED,
      reason,
      rejected: reason,
      fulfilled: null,
      index,
    };
    return result;
  }
}

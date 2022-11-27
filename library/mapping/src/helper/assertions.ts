import { FULFILLED, REJECTED } from '../constants';
import { Settled, SettledIso, SettledLeft, SettledRight } from '../types';

export function is_SettledResult<T>(
  contender: any
): contender is PromiseSettledResult<T> {
  return is_FulfilledResult<T>(contender) || is_RejectedResult(contender);
}
export function is_FulfilledResult<T>(
  contender: any
): contender is PromiseFulfilledResult<T> {
  return contender?.status === FULFILLED && 'value' in contender;
}

export function is_RejectedResult(
  contender: any
): contender is PromiseRejectedResult {
  return contender?.status === REJECTED && 'reason' in contender;
}

export function is_Settled<T>(contender: any): contender is Settled<T> {
  return is_SettledRight<T>(contender) || is_SettledLeft(contender);
}

export function is_SettledIso<T>(contender: any): contender is SettledIso<T> {
  return is_SettledRight<T>(contender) || is_SettledLeft(contender);
}
export function is_SettledRight<T>(
  contender: any
): contender is SettledRight<T> {
  return (
    is_FulfilledResult(contender) &&
    FULFILLED in contender &&
    'index' in contender
  );
}

export function is_SettledLeft(contender: any): contender is SettledLeft {
  return (
    is_RejectedResult(contender) &&
    REJECTED in contender &&
    'index' in contender
  );
}

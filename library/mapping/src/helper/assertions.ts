import { FULFILLED, REJECTED } from '../constants';
import { Settled, SettledIso, SettledLeft, SettledRight } from '../types';

export function isSettledResult<T>(
  contender: any
): contender is PromiseSettledResult<T> {
  return isFulfilledResult<T>(contender) || isRejectedResult(contender);
}
export function isFulfilledResult<T>(
  contender: any
): contender is PromiseFulfilledResult<T> {
  return contender?.status === FULFILLED && 'value' in contender;
}

export function isRejectedResult(
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
    isFulfilledResult(contender) &&
    FULFILLED in contender &&
    'index' in contender
  );
}

export function is_SettledLeft(contender: any): contender is SettledLeft {
  return (
    isRejectedResult(contender) && REJECTED in contender && 'index' in contender
  );
}

/*



// Warnings were encountered during analysis:
//
// src/index.ts:39:26
(ae-forgotten-export) The symbol
"converToIsometricSettledResult"
// src/index.ts:39:26
(ae-forgotten-export) The symbol
"isometricSettledResult"
// src/index.ts:39:26
(ae-forgotten-export) The symbol
"getFulfilledResults"
// src/index.ts:39:26
(ae-forgotten-export) The symbol
"listFulfilledResults"
// src/index.ts:39:26
(ae-forgotten-export) The symbol
"getRejectedResults"
// src/index.ts:39:26
(ae-forgotten-export) The symbol
"settledLengts"

// (No @packageDocumentation comment for this package)


 */

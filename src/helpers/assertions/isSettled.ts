import { FULFILLED, REJECTED } from '../../constants';
import type { Settled, SettledLeft, SettledRight } from '../../types';
import type { TransformStep } from '../../types/TransformStep';

/**
 * @category Assertion Tools
 *
 *  @public
 *
 */
export function isSettled<T>(contender: unknown): contender is Settled<T> {
  return isSettledRight<T>(contender) || isSettledLeft(contender);
}

/**
 * @category Assertion Tools
 * @public
 */
export function hasTransformStep(
  countender: unknown
): countender is TransformStep {
  let result = false;
  try {
    result =
      countender != null &&
      'object' === typeof countender &&
      'transformStep' in countender &&
      'number' === typeof countender.transformStep;
  } catch {
    // Do nothing
    /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
  }
  return result;
}

/**
 * @category Assertion Tools
 * @public
 */
export function isSettledRight<T>(
  contender: unknown
): contender is SettledRight<T> {
  let result = false;
  try {
    if ('object' === typeof contender && contender !== null) {
      result =
        'status' in contender &&
        'value' in contender &&
        'currentRejection' in contender &&
        'transformStep' in contender &&
        'number' === typeof contender.transformStep &&
        'index' in contender &&
        'number' === typeof contender.index &&
        (('reason' in contender && contender.reason === undefined) ||
          !('reason' in contender)) &&
        //
        FULFILLED in contender &&
        REJECTED in contender &&
        null === contender.rejected &&
        //
        contender.status === FULFILLED &&
        contender.value === contender[FULFILLED] &&
        //
        null === contender.currentRejection;
    }
  } catch {
    // Do nothing
    /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
  }
  return result;
}

/**
 * @category Assertion Tools
 * @public
 */
export function isSettledLeft(contender: unknown): contender is SettledLeft {
  let result = false;
  try {
    result =
      'object' === typeof contender &&
      contender !== null &&
      //
      'status' in contender &&
      'reason' in contender &&
      'currentRejection' in contender &&
      'transformStep' in contender &&
      'number' === typeof contender.transformStep &&
      'index' in contender &&
      'number' === typeof contender.index &&
      (('value' in contender && contender.value === undefined) ||
        !('value' in contender)) &&
      //
      REJECTED in contender &&
      FULFILLED in contender &&
      null === contender.fulfilled &&
      //
      contender.status === REJECTED &&
      contender.reason === contender[REJECTED] &&
      //
      (true === contender.currentRejection ||
        false === contender.currentRejection ||
        contender.currentRejection === undefined);
  } catch {
    // Do nothing
    /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
  }
  return result;
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

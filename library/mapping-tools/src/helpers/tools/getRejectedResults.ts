import { REJECTED } from '../../constants';
import { Settled, SettledLeft } from '../../types';
import { converToIsometricSettledResult } from './converToIsometricSettledResult';

/** @beta */

export function getRejectedResults<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): SettledLeft[] {
  const result = collection.filter(
    (item): item is SettledLeft | PromiseRejectedResult =>
      item.status === REJECTED
  );
  return converToIsometricSettledResult(result);
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

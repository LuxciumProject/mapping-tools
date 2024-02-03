import { FULFILLED } from '../../constants';
import type { SettledRight } from '../../types';

// FUNC DEF:(makeFulfillement<U>) ------------------------------------
/** @internal */
export function makeFulfillement<U>({
  value,
  transformStep = -1,
  index = -1,
  base = {},
}: {
  value: U;
  index?: number;
  transformStep?: number | undefined;
  base?: { value: U; status: 'fulfilled'; index?: number } | {};
}): SettledRight<U> {
  const currentValue = Object.freeze(value);
  const currentSettlement: PromiseSettledResult<U> = {
    status: FULFILLED,
    value: currentValue,
  };

  const currentIndex =
    base != null &&
    'object' === typeof base &&
    'index' in base &&
    base.index != null &&
    'number' === typeof base.index &&
    base.index > -1 &&
    !Number.isNaN(base.index)
      ? base.index
      : 'number' === typeof index && !Number.isNaN(index)
        ? index
        : -1;

  // INFO: To get base properties last but also overide its values ...
  const result: SettledRight<U> = {
    ...currentSettlement,
    ...base,
    ...currentSettlement,
    fulfilled: currentValue,
    currentRejection: null,
    rejected: null,
    reason: undefined,
    index: currentIndex,
    transformStep: transformStep ?? -1,
  };

  Object.defineProperty(result, 'reason', {
    value: undefined,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'value', {
    value: currentValue,
    enumerable: true,
    writable: false,
  });

  Object.defineProperty(result, 'fulfilled', {
    value: currentValue,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'rejected', {
    value: null,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'currentRejection', {
    value: null,
    enumerable: false,
    writable: false,
  });

  if (-1 === transformStep) {
    Object.defineProperty(result, 'transformStep', {
      value: transformStep,
      enumerable: false,
      writable: false,
    });
  } else {
    Object.defineProperty(result, 'transformStep', {
      value: transformStep,
      enumerable: true,
      writable: false,
    });
  }

  if (-1 === currentIndex) {
    Object.defineProperty(result, 'index', {
      value: currentIndex,
      enumerable: false,
      writable: false,
    });
  }
  // else {
  //   Object.defineProperty(result, 'index', {
  //     value: currentIndex,
  //     enumerable: true,
  //     writable: false,
  //   });
  // }

  return Object.freeze(result);
}

// TASK LIST: [TODO] (Review Documentation) --------------------------

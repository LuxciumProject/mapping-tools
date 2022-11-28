import { FULFILLED, REJECTED } from './constants';
import {
  awaitedMapping_α,
  generateMappingAsync_α,
  generateMapping_ς,
  paralellMapping_ς,
  serialMapping_α,
} from './core';
import {
  converToIsometricSettledResult,
  getFulfilledResults,
  getRejectedResults,
  isometricSettledResult,
  listFulfilledResults,
  settledLengts,
} from './helper';

export type {
  ErrLookupFn,
  IMappable,
  LookupFn,
  Mapper,
  MapperOptions,
  OnlySideEffect,
  Settled,
  SettledIso,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from './types';
export { awaitedMapping_α as awaitedMapping };
export { generateMapping_ς as generateMapping };
export { generateMappingAsync_α as generateMappingAsync };
export { paralellMapping_ς as paralellMapping };
export { serialMapping_α as serialMapping };
export { converToIsometricSettledResult };
export { isometricSettledResult };
export { getFulfilledResults };
export { listFulfilledResults };
export { getRejectedResults };
export { settledLengts };

/** @public */
export const helpersTools = {
  converToIsometricSettledResult,
  isometricSettledResult,
  getFulfilledResults,
  listFulfilledResults,
  getRejectedResults,
  settledLengts,
};
/** @public */
export const constants = {
  FULFILLED,
  REJECTED,
};

/** @public */
export const mappingTools = {
  helpersTools,
  constants,
  awaitedMapping_α,
  generateMapping_ς,
  generateMappingAsync_α,
  paralellMapping_ς,
  serialMapping_α,
};

/** @public */
export default mappingTools;

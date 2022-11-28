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
  Mapper,
  Settled,
  SettledIso,
  SettledLeft,
  SettledRight,
} from './types';
export { awaitedMapping_α as awaitedMapping };
export { generateMapping_ς as generateMapping };
export { generateMappingAsync_α as generateMappingAsync };
export { paralellMapping_ς as paralellMapping };
export { serialMapping_α as serialMapping };

export const helpersTools = {
  converToIsometricSettledResult,
  isometricSettledResult,
  getFulfilledResults,
  listFulfilledResults,
  getRejectedResults,
  settledLengts,
};
export const constants = {
  FULFILLED,
  REJECTED,
};

export const mappingTools = {
  helpersTools,
  constants,
  awaitedMapping_α,
  generateMapping_ς,
  generateMappingAsync_α,
  paralellMapping_ς,
  serialMapping_α,
};

export default mappingTools;

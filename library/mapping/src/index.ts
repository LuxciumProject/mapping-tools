import { awaitedMapping_α } from './awaitedMapping_α';
import { FULFILLED, REJECTED } from './constants';
import { generateMappingAsync_α } from './generateMappingAsync_α';
import { generateMapping_ς } from './generate_ς';
import {
  converToIsometricSettledResult,
  getFulfilledResults,
  getRejectedResults,
  isometricSettledResult,
  listFulfilledResults,
  settledLengts,
} from './helper';
import { paralellMapping_ς } from './paralellMapping_ς';
import { serialMapping_α } from './serialMapping_α';

export type {
  Mapper,
  Settled,
  SettledIso,
  SettledLeft,
  SettledRight,
} from './types';
export { awaitedMapping_α as awaitedMapping };
export { generateMappingAsync_α as generateMappingAsync };
export { generateMapping_ς as generateMapping };
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
  serialMapping_α,
  paralellMapping_ς,
  awaitedMapping_α,
  generateMapping_ς,
  generateMappingAsync_α,
  helpersTools,
  constants,
};

export default mappingTools;

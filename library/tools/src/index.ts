export * as dummyExampleStructure_001 from './dummy-example-structure-001';
export * as dummyExampleStructure_002 from './dummy-example-structure-002';
import * as ScanDirs from './scan-dirs';
import type { Mapper as Mapper_ } from './types/scan-dir';

export namespace types {
  export type Mapper = Mapper_;
}

export const tools = {
  ScanDirs,
};

export default tools;

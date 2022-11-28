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



api-extractor 7.33.6  - https://api-extractor.com/

Using configuration from ./config/api-extractor.json
Analysis will use the bundled TypeScript version 4.8.4
*** The target project appears to use TypeScript 4.9.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Writing: /media/luxcium/projects/monorepo-one/library/mapping/temp/mapping-tools.api.json
The API report is up to date: temp/mapping-tools.api.md
Writing package typings: /media/luxcium/projects/monorepo-one/library/mapping/dist/mapping-tools.d.ts
Warning: src/core/awaitedMapping_α.ts:10:1
* (ae-missing-release-tag) "awaitedMapping_α" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/core/generateMappingAsync_α.ts:10:1
* (ae-missing-release-tag) "generateMappingAsync_α" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/core/generateMapping_ς.ts:10:1
* (ae-missing-release-tag) "generateMapping_ς" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/core/paralellMapping_ς.ts:10:1
* (ae-missing-release-tag) "paralellMapping_ς" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/core/serialMapping_.ts:12:1
* (ae-missing-release-tag) "serialMapping_α" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/index.ts:31:14
* (ae-missing-release-tag) "helpersTools" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/index.ts:39:14
* (ae-missing-release-tag) "constants" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/index.ts:44:14
* (ae-missing-release-tag) "mappingTools" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/types/Mapper.ts:5:1
* (ae-missing-release-tag) "Mapper" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/types/Settled.ts:5:1
* (ae-missing-release-tag) "Settled" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/types/Settled.ts:7:1
* (ae-missing-release-tag) "SettledRight" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/types/Settled.ts:17:1
* (ae-missing-release-tag) "SettledLeft" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)

Warning: src/types/SettledIso.ts:1:1
* (ae-missing-release-tag) "SettledIso" is part of the package's API, but it is missing a release tag (@alpha, @beta, @public, or @internal)


API Extractor completed successfully


 */

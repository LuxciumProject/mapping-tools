import { RedisClientType } from 'redis';
import type {
  DebugFlag,
  ImageFilePathWithAwaitedStats,
  ImageFileWithPHashString,
  WithAwaited,
} from './types';

import { getBigStrPHashFromFile } from './getBigStrPHashFromFile';
import { pHashGetLookUp } from './pHashGetLookUp';
import { redisSetK } from './redisSetK';

/**
 *
 * @param R
 * @param debug
 * @returns The same object T passed in to wich will be added the newly
 * calculated or lokedUp pHashString and if available the redis key
 *
 * In order to use this utility service you must pass a R redis client and an optional debug flag
 * The debug flag is of type  "debug" or verbose" / null or false.
 *
 * You will have a computer with caching system to get the fom an object containinng a compatibleImagefilePath string key
 * @remarks
 */
export function getCachedPhashString_core(
  R: RedisClientType | null = null,
  debug: DebugFlag = null
) {
  return async <T extends ImageFilePathWithAwaitedStats>(
    imageFilePath: T
  ): Promise<T & ImageFileWithPHashString> => {
    const { compatibleImagefilePath } = imageFilePath;
    const { size } = await imageFilePath.awaited.stat;
    const pathObj = {
      path: compatibleImagefilePath,
      size,
    };

    // Without RedisClient no need to look into the cache
    if (!R) {
      const bigStr = await getBigStrPHashFromFile(pathObj.path);
      return {
        ...imageFilePath,
        pHashString: bigStr,
        pHashMethod: 'direct',
        size,
      };
    }

    // Lookup if available from inside the cache
    const lookUP = await pHashGetLookUp(R, pathObj.path);
    const { pHashString, pHashMethod } = lookUP;

    // if LookUP is positive (not false and not emptystring)
    if (pHashString !== false && pHashString !== '') {
      !!debug && console.warn(`lookUP:`, lookUP);

      // Then return from cache
      return { ...imageFilePath, pHashString, pHashMethod, size };
    } else {
      // Else calculate the value
      const bigStr = await getBigStrPHashFromFile(pathObj.path);

      // If the calculated string is not an empty string
      if (bigStr !== '') {
        // And if we can set it into the cache
        if (await redisSetK(R, pathObj.path, bigStr)) {
          !!debug && console.warn(`computed: ${bigStr}`);

          // Return the newly calculated value
          return {
            ...imageFilePath,
            pHashString: bigStr,
            pHashMethod: 'cached',
            size,
          };
        }
      }
      !!debug &&
        console.error(
          `Error (can't compute phashString): '<empty string>'`,
          pathObj
        );

      // Return the newly calculated value
      return { ...imageFilePath, pHashString: bigStr, pHashMethod: null, size };
    }
  };
}

export function mixAwaited<
  A extends Object,
  B extends Object,
  T extends WithAwaited<A>,
  U extends WithAwaited<B>
>(a: T, b: U) {
  const awaitedA = a.awaited;
  const awaitedB = b.awaited;

  return { ...a, ...b, awaited: { ...awaitedA, ...awaitedB } };
}

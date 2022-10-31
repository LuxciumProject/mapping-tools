import { promises } from 'fs';
import { RedisClientType } from 'redis';

import { getBigStrPHashFromFile } from './getBigStrPHashFromFile';
import { pHashGetLookUp } from './pHashGetLookUp';
import { redisSetK } from './redisSetK';

export const debug = false;
debug && console.error('debug on in ', __filename);

export function getCachedPhashString_core(R: RedisClientType | null = null) {
  return async (compatibleImagefilePath: string) => {
    const pathObj = {
      path: compatibleImagefilePath,
      size: (await promises.stat(compatibleImagefilePath)).size,
    };

    // Without RedisClient no need to look into the cache
    if (!R) {
      const bigStr = await getBigStrPHashFromFile(pathObj.path);
      return bigStr;
    }

    // Lookup if already inside the cache
    const lookUP = await pHashGetLookUp(R, pathObj.path);

    // if LookUP is positive (not false and not emptystring)
    if (lookUP !== false && lookUP !== '') {
      debug && console.warn(`lookUP: ${lookUP}`);
      // Then return from cache
      return lookUP;
    } else {
      // Else calculate the value
      const bigStr = await getBigStrPHashFromFile(pathObj.path);

      // If the calue is not the empty string
      if (bigStr !== '') {
        // And if we can set it into the cache
        if (await redisSetK(R, pathObj.path, bigStr)) {
          debug && console.warn(`computed: ${bigStr}`);
          // Return the newly calculated value
          return bigStr;
        }
      }
      debug && console.error(`Error: '<empty string>'`, pathObj);
      // Return the newly calculated value
      return bigStr;
    }
  };
}

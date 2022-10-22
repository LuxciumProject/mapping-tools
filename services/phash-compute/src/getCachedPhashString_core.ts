import { promises } from 'fs';
import { RedisClientType } from 'redis';

import { getBigStrPHashFromFile } from './getBigStrPHashFromFile';
import { pHashGetLookUp } from './pHashGetLookUp';
import { redisSetK } from './redisSetK';

export const debug = false;
debug && console.error('debug on in ', __filename);
export function getCachedPhashString_core(R: RedisClientType | null = null) {
  return async (filePath: string) => {
    const pathObj = {
      path: filePath,
      size: (await promises.stat(filePath)).size,
    };

    if (!R) {
      const bigStr = await getBigStrPHashFromFile(pathObj.path);
      return bigStr;
    }
    const lookUP = await pHashGetLookUp(R, pathObj.path);
    if (lookUP !== false && lookUP !== '') {
      debug && console.warn(`lookUP: ${lookUP}`);
      return lookUP;
    } else {
      const bigStr = await getBigStrPHashFromFile(pathObj.path);
      if (bigStr !== '') {
        if (await redisSetK(R, pathObj.path, bigStr)) {
          debug && console.warn(`computed: ${bigStr}`);
          return bigStr;
        }
      }
      debug && console.error(`Error: '<empty string>'`, pathObj);
      return bigStr;
    }
  };
}

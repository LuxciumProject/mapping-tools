import { RedisClientType } from 'redis';

import { makePhashCacheKey } from './makePhashCacheKey';

export async function pHashGetLookUp(
  R: RedisClientType,
  pathStr: string
): Promise<{
  pHashString: string | false;
  pHashMethod: string;
  cacheKey: string;
}> {
  const K = makePhashCacheKey(pathStr);
  return R.GET(K).then((lookUP: any) => ({
    pHashString: lookUP !== null ? `${lookUP}` : false,
    pHashMethod: 'lookUp',
    cacheKey: K,
  }));
}

/*
: Promise<{
    pHashString: string | false;
    pHashMethod: string;
    cacheKey: string;
}>
{
            pHashString: lookUP !== null ? `${lookUP}` : false,
            pHashMethod: 'lookUp',
            cacheKey: K
          }

           */

import { stat } from 'node:fs/promises';
import {
  ImageFilePathWithAwaitedStats,
  WithAwaited,
} from '../types/ImageFilePath';

export function boxImageFileWithStats(
  compatibleImagefilePath: string
): ImageFilePathWithAwaitedStats {
  return {
    compatibleImagefilePath,
    awaited: {
      stat: (async () => await stat(compatibleImagefilePath))(),
    },
  };
}

export function mixAwaited<
  A extends Object,
  B extends Object,
  T extends WithAwaited<A>,
  U extends WithAwaited<B>
>(
  a: T,
  b: U
): T &
  U & {
    awaited: A & B;
  } {
  const awaitedA = a.awaited;
  const awaitedB = b.awaited;

  return { ...a, ...b, awaited: { ...awaitedA, ...awaitedB } };
}

const dummyImageFileWithStats = boxImageFileWithStats('');
const dummyImageWithAwaited = {
  dummy: 'value',
  awaited: { statDummy: (async () => 'Dummy await')() },
};

const dommyImageWithAwaited = {
  dommy: 'value',
  awaited: { statDommy: (async () => 'Dummy await')() },
};
dummyImageFileWithStats;
dummyImageWithAwaited;

export const resultDummy = mixAwaited(
  dummyImageWithAwaited,
  dommyImageWithAwaited
);
export const resultDummy2 = mixAwaited(resultDummy, dummyImageFileWithStats);

const foo1 = {
  foo: 'machin',
  awaited: { bolo: (async () => 'await bolo')() },
};

const bar1 = {
  bar: 'bidule',
  awaited: { toto: (async () => 'await toto')() },
};

export const resultDummy3 = mixAwaited(foo1, bar1);

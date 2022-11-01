// https://tsplay.dev/with_awaited-002
export type With<T extends Object> = T;

export type ImageFilePath = With<{
  compatibleImagefilePath: string;
}>;

export type WithAwaited<T extends Object> = {
  awaited: T;
};

export function mixBase<
  T extends { awaited?: any },
  U extends { awaited?: any },
  A extends Omit<T, 'awaited'>,
  B extends Omit<U, 'awaited'>
>(a: T, b: U): A & B {
  const { awaited: awaitedA, ...restA } = a;
  const { awaited: awaitedB, ...restB } = b;

  return { ...restA, ...restB } as A & B;
}

const foo1 = {
  foo: 'machin',
  awaited: { bolo: (async () => 'await bolo')() },
};

const bar1 = {
  bar: 'bidule',
  awaited: { toto: (async () => 'await toto')() },
};
export const fakeResult_001 = {
  ...mixBase(foo1, bar1),
};
console.log('fakeResult_001:', fakeResult_001);

export function mixAwaited<
  A extends Object,
  B extends Object,
  T extends WithAwaited<A>,
  U extends WithAwaited<B>
>(a: A & T, b: B & U): { awaited: A & B } {
  return { awaited: { ...a.awaited, ...b.awaited } };
}

export function mixAwaited2<
  T extends { awaited: object },
  U extends { awaited: object },
  A extends Pick<T, 'awaited'>,
  B extends Pick<U, 'awaited'>
>(a: A, b: B) {
  const { awaited: awaitedA } = a;
  const { awaited: awaitedB } = b;
  const awaited = { ...awaitedA, ...awaitedB };
  return { awaited } as A & B;
}
export const fakeResult_002 = {
  ...mixAwaited2(foo1, bar1),
};
console.log('fakeResult_002:', fakeResult_002);

const fakeResult_003 = { ...fakeResult_001, ...fakeResult_002 };
console.log('fakeResult_003:', fakeResult_003);

const fakeResult_004 = { ...fakeResult_002, ...fakeResult_001 };
console.log('fakeResult_004:', fakeResult_004);

export const fakeResult_005 = {
  foo: 'machin',
  bar: 'bidule',
  awaited: {
    bolo: (async () => 'await bolo')(),
    toto: (async () => 'await toto')(),
  },
};
console.log('fakeResult_005:', fakeResult_005);

/*
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

export function mixAwaited2<
  A extends {},
  B extends {},
  T extends WithAwaited<A>,
  U extends WithAwaited<B>
>(
  a: T,
  b: U
): T &
  U & {
    awaited: A & B;
  } {
  return { ...mixAwaited(a, b) };
}

export function mixAwaited<
  A extends {},
  B extends {},
  T extends WithAwaited<A>,
  U extends WithAwaited<B>
>(a: T, b: U): { awaited: A & B } {
  return { awaited: { ...a.awaited, ...b.awaited } };
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

export const resultDummy = mixAwaited2(
  dummyImageWithAwaited,
  dommyImageWithAwaited
);
export const resultDummy2 = mixAwaited2(resultDummy, dummyImageFileWithStats);
export const resultDummy3 = {
  ...mixBase(resultDummy, dummyImageFileWithStats),
};

// ... awaited(resultDummy, dummyImageFileWithStats)
 */

// import { stat } from 'node:fs/promises';
// import {
//   ImageFilePathWithAwaitedStats,
//   WithAwaited
// } from '../types/ImageFilePath';

// export type WithAwaitedStats = WithAwaited<{
//   stat: Promise<Stats>;
// }>;

// export type ImageFilePathWithAwaitedStats = WithAwaitedStats & ImageFilePath;
// https://tsplay.dev/with_awaited-001

// https://tsplay.dev/mixWithawaited-002

type WithFoo = { foo: string; };
type WithAwaited<T> = { awaited: T; };
type WithAwaitedBolo = WithAwaited<{ bolo: Promise<string>; }>;  // { awaited: { bolo: Promise<string>; }; };

const foo1: WithFoo & WithAwaitedBolo = {
  foo: 'machin',
  awaited: { bolo: (async () => 'await bolo')() },
};

type WithBar = { bar: string; };
type WithAwaitedToto = { awaited: { toto: Promise<string>; }; };

const bar1: WithBar & WithAwaitedToto = {
  bar: 'bidule',
  awaited: { toto: (async () => 'await toto')() },
};
export function mixBase_a<
  T extends { awaited?: any; },
  U extends { awaited?: any; },
  A extends Omit<T, 'awaited'>,
  B extends Omit<U, 'awaited'>
>(a: T, b: U): A & B {
  const { awaited: awaitedA, ...restA } = a;
  const { awaited: awaitedB, ...restB } = b;

  return { ...restA, ...restB } as A & B;
}

export function mixAwaited_a<
  A extends { awaited: object; },
  B extends { awaited: object; },
  T = Pick<A, 'awaited'>,
  U = Pick<B, 'awaited'>
>(a: A, b: B) {
  const { awaited: awaitedA } = a;
  const { awaited: awaitedB } = b;

  const awaited = { ...awaitedA, ...awaitedB };
  return { awaited } as T & U;
}

const base_a/* : WithAwaitedBolo& WithAwaitedToto& WithFoo& WithBar */ = {
  ...mixBase_a<WithAwaitedBolo, WithAwaitedToto, WithFoo, WithBar>(foo1, bar1),
};
const { awaited } = {
  ...mixAwaited_a<WithAwaitedBolo, WithAwaitedToto>(foo1, bar1),
};
const awaited_a = { awaited: { ...awaited } };
const mixed_a = { ...base_a, ...awaited_a };
const mixed_b = { ...awaited_a, ...base_a };

console.log('mixed_a:', mixed_a);
console.log('mixed_b:', mixed_b);

/*
  // +KEEP THIS

      // export type With<T extends Object> = T;

      // export type ImageFilePath = With<{
      //   compatibleImagefilePath: string;
      // }>;

      // export type WithAwaited<T extends Object> = {
      //   awaited: T;
      // };

  // +KEEP THIS
*/

// const together = {
//   ...awaitedA
//   ,
//   ...awaitedB
// };
// console.log('\nall a:', a, '\nall b:', b, '\njust awaited a:', awaitedA, '\njust awaited b:', awaitedB, '\nspread awaited a:', { ...awaitedA }, '\nspread awaited b:', { ...awaitedB }, '\nspeaded together:', together);
// const mixAwaited_a_1 = mixAwaited_a(foo1, bar1);
// console.log('\n\nmixAwaited_a_1:', mixAwaited_a_1, '\n\n');
// const mixAwaited_a_2 = { ...mixAwaited_a(foo1, bar1) };
// console.log('\n\nmixAwaited_a_2:', mixAwaited_a_2, '\n\n');
// console.log(mixed_a.foo);
// console.log(mixed_a.bar);
// console.log(mixed_a.awaited.bolo);
// console.log(mixed_a.awaited.toto);

// export function mixWithAwaited_a<
//   T extends { awaited: object; },
//   U extends { awaited: object; },
//   A extends Pick<T, 'awaited'>,
//   B extends Pick<U, 'awaited'>
// >(a: A, b: B) {
//   const { awaited: awaitedA } = a;
//   const { awaited: awaitedB } = b;
//   const awaited = { ...awaitedA, ...awaitedB };
//   return { awaited } as A & B;
// }

// export function mixBase<
//   T extends { awaited?: any; },
//   U extends { awaited?: any; },
//   A extends Omit<T, 'awaited'>,
//   B extends Omit<U, 'awaited'>
// >(a: T, b: U): A & B {
//   const { awaited: awaitedA, ...restA } = a;
//   const { awaited: awaitedB, ...restB } = b;

//   return { ...restA, ...restB } as A & B;
// }
// export function mixAwaited<
//   A extends Object,
//   B extends Object,
//   T extends WithAwaited<A>,
//   U extends WithAwaited<B>
// >(a: A & T, b: B & U): { awaited: A & B; } {
//   return { awaited: { ...a.awaited, ...b.awaited } };
// }

// export function mixWithAwaited<
//   T extends { awaited: object; },
//   U extends { awaited: object; },
//   A extends Pick<T, 'awaited'>,
//   B extends Pick<U, 'awaited'>
// >(a: A, b: B) {
//   const { awaited: awaitedA } = a;
//   const { awaited: awaitedB } = b;
//   const awaited = { ...awaitedA, ...awaitedB };
//   return { awaited } as A & B;
// }

// export const fakeResult_001 = {
//   ...mixBase(foo1, bar1),
// };
// console.log('fakeResult_001:', fakeResult_001);

// export const fakeResult_002 = {
//   ...mixWithAwaited(foo1, bar1),
// };
// console.log('fakeResult_002:', fakeResult_002);

// const fakeResult_003 = { ...fakeResult_001, ...fakeResult_002 };
// console.log('fakeResult_003:', fakeResult_003);

// const fakeResult_004 = { ...fakeResult_002, ...fakeResult_001 };
// console.log('fakeResult_004:', fakeResult_004);

// export const fakeResult_005 = {
//   foo: 'machin',
//   bar: 'bidule',
//   awaited: {
//     bolo: (async () => 'await bolo')(),
//     toto: (async () => 'await toto')(),
//   },
// };
// console.log('fakeResult_005:', fakeResult_005);

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

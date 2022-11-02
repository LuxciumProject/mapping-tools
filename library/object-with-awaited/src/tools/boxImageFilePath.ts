// https://tsplay.dev/mixWithawaited-002

import { WithExpected } from '../types';
import { mixBases } from './mixBases';
import { mixExpected } from './mixExpected';

export type WithBar = { bar: string };
export type WithFoo = { foo: string };
export type WithPath = { path: string };
export type WithAllThat = WithBar & WithFoo & WithPath;
export const dummy: WithAllThat = {
  bar: 'string',
  foo: 'string',
  path: '/dummy/path/toFile.ext',
};

export const withFoo: WithFoo = {
  foo: 'string',
};

export const withBar: WithBar = {
  bar: 'string',
};

export const withPath: WithPath = {
  path: '/dummy/path/toFile.ext',
};

const partial = mixBases<any, any, { foo: string }, { bar: string }>(
  withFoo,
  withBar
);
partial;

type WithExpectedBolo = WithExpected<{ bolo: Promise<string> }>;

export const dummy2: WithAllThat & WithExpectedBolo = {
  bar: 'string',
  foo: 'string',
  path: '/dummy/path/toFile.ext',
  expected: { bolo: Promise.resolve('string') },
};

const foo1: WithFoo & WithExpectedBolo = {
  foo: 'machin',
  expected: { bolo: (async () => 'await bolo')() },
};

type WithExpectedToto = { expected: { toto: Promise<string> } };

const bar1 = {
  bar: 'bidule',
  expected: { toto: (async () => 'await toto')() },
};

const base_a /* : WithExpectedBolo& WithExpectedToto& WithFoo& WithBar */ = {
  ...mixBases<WithExpectedBolo, WithExpectedToto, WithFoo, WithBar>(foo1, bar1),
};
const { expected } = {
  ...mixExpected<WithExpectedBolo, WithExpectedToto>(foo1, bar1),
};
const expected_a = { expected: { ...expected } };
const mixed_a = { ...base_a, ...expected_a };
const mixed_b = { ...expected_a, ...base_a };

console.log('mixed_a:', mixed_a);
console.log('mixed_b:', mixed_b);

export function mixedObj_a<
  A extends { expected: object },
  B extends { expected: object },
  C extends Omit<A, 'expected'>,
  D extends Omit<B, 'expected'>,
  E = Pick<A, 'expected'>,
  F = Pick<B, 'expected'>
>(foo1: A, bar1: B) {
  const base_a = {
    ...mixBases(foo1, bar1),
  };
  base_a;
  const none: any = null;
  const voiderA: E & F = none;
  const voiderB: C & D = none;
  void voiderA;
  void voiderB;

  const { expected } = {
    ...mixExpected(foo1, bar1),
  };

  return { ...base_a, expected };
}

const mixed_c = mixedObj_a(foo1, bar1);
mixed_c;
/*
  // +KEEP THIS

      // export type With<T extends Object> = T;

      // export type ImageFilePath = With<{
      //   compatibleImagefilePath: string;
      // }>;

      // export type WithExpected<T extends Object> = {
      //   expected: T;
      // };

  // +KEEP THIS
*/

// const together = {
//   ...expectedA
//   ,
//   ...expectedB
// };
// console.log('\nall a:', a, '\nall b:', b, '\njust expected a:', expectedA, '\njust expected b:', expectedB, '\nspread expected a:', { ...expectedA }, '\nspread expected b:', { ...expectedB }, '\nspeaded together:', together);
// const mixExpected_a_1 = mixExpected_a(foo1, bar1);
// console.log('\n\nmixExpected_a_1:', mixExpected_a_1, '\n\n');
// const mixExpected_a_2 = { ...mixExpected_a(foo1, bar1) };
// console.log('\n\nmixExpected_a_2:', mixExpected_a_2, '\n\n');
// console.log(mixed_a.foo);
// console.log(mixed_a.bar);
// console.log(mixed_a.expected.bolo);
// console.log(mixed_a.expected.toto);

// export function mixWithExpected_a<
//   T extends { expected: object; },
//   U extends { expected: object; },
//   A extends Pick<T, 'expected'>,
//   B extends Pick<U, 'expected'>
// >(a: A, b: B) {
//   const { expected: expectedA } = a;
//   const { expected: expectedB } = b;
//   const expected = { ...expectedA, ...expectedB };
//   return { expected } as A & B;
// }

// export function mixBase<
//   T extends { expected?: any; },
//   U extends { expected?: any; },
//   A extends Omit<T, 'expected'>,
//   B extends Omit<U, 'expected'>
// >(a: T, b: U): A & B {
//   const { expected: expectedA, ...restA } = a;
//   const { expected: expectedB, ...restB } = b;

//   return { ...restA, ...restB } as A & B;
// }
// export function mixExpected<
//   A extends Object,
//   B extends Object,
//   T extends WithExpected<A>,
//   U extends WithExpected<B>
// >(a: A & T, b: B & U): { expected: A & B; } {
//   return { expected: { ...a.expected, ...b.expected } };
// }

// export function mixWithExpected<
//   T extends { expected: object; },
//   U extends { expected: object; },
//   A extends Pick<T, 'expected'>,
//   B extends Pick<U, 'expected'>
// >(a: A, b: B) {
//   const { expected: expectedA } = a;
//   const { expected: expectedB } = b;
//   const expected = { ...expectedA, ...expectedB };
//   return { expected } as A & B;
// }

// export const fakeResult_001 = {
//   ...mixBase(foo1, bar1),
// };
// console.log('fakeResult_001:', fakeResult_001);

// export const fakeResult_002 = {
//   ...mixWithExpected(foo1, bar1),
// };
// console.log('fakeResult_002:', fakeResult_002);

// const fakeResult_003 = { ...fakeResult_001, ...fakeResult_002 };
// console.log('fakeResult_003:', fakeResult_003);

// const fakeResult_004 = { ...fakeResult_002, ...fakeResult_001 };
// console.log('fakeResult_004:', fakeResult_004);

// export const fakeResult_005 = {
//   foo: 'machin',
//   bar: 'bidule',
//   expected: {
//     bolo: (async () => 'await bolo')(),
//     toto: (async () => 'await toto')(),
//   },
// };
// console.log('fakeResult_005:', fakeResult_005);

/*
export function boxImageFileWithStats(
  compatibleImagefilePath: string
): ImageFilePathWithExpectedStats {
  return {
    compatibleImagefilePath,
    expected: {
      stat: (async () => await stat(compatibleImagefilePath))(),
    },
  };
}

export function mixExpected2<
  A extends {},
  B extends {},
  T extends WithExpected<A>,
  U extends WithExpected<B>
>(
  a: T,
  b: U
): T &
  U & {
    expected: A & B;
  } {
  return { ...mixExpected(a, b) };
}

export function mixExpected<
  A extends {},
  B extends {},
  T extends WithExpected<A>,
  U extends WithExpected<B>
>(a: T, b: U): { expected: A & B } {
  return { expected: { ...a.expected, ...b.expected } };
}

const dummyImageFileWithStats = boxImageFileWithStats('');
const dummyImageWithExpected = {
  dummy: 'value',
  expected: { statDummy: (async () => 'Dummy await')() },
};

const dommyImageWithExpected = {
  dommy: 'value',
  expected: { statDommy: (async () => 'Dummy await')() },
};
dummyImageFileWithStats;
dummyImageWithExpected;

export const resultDummy = mixExpected2(
  dummyImageWithExpected,
  dommyImageWithExpected
);
export const resultDummy2 = mixExpected2(resultDummy, dummyImageFileWithStats);
export const resultDummy3 = {
  ...mixBase(resultDummy, dummyImageFileWithStats),
};

// ... expected(resultDummy, dummyImageFileWithStats)
 */

// import { stat } from 'node:fs/promises';
// import {
//   ImageFilePathWithExpectedStats,
//   WithExpected
// } from '../types/ImageFilePath';

// export type WithExpectedStats = WithExpected<{
//   stat: Promise<Stats>;
// }>;

// export type ImageFilePathWithExpectedStats = WithExpectedStats & ImageFilePath;
// https://tsplay.dev/with_expected-001

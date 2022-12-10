import { Base, ErrLookupFn, LookupFn, TransformFn, ValidateFn } from '../types';
import { fn_a1f9a } from './core';

/** @public */
export function paralellMapping<T, R>(
  collection: Iterable<Base<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  return [...collection].map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      transform,
      array,
      lookup,
      validate,
      errLookup,
    })
  );
}
/*
export async function paralellMapping_<T, R>(
  collection: Collection<T> | PromiseLike<Collection<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  const values = isPromiseLike(collection) ? await collection : collection;

  return [...values].map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      transform,
      array,
      lookup,
      validate,
      errLookup,
    })
  );
}
 */

// /* istanbul ignore next */
// void function paralellMapping_v1<T, R>(
//   collection: Iterable<Base<T>>,
//   transform: TransformFn<T, R> = async value => value as any as R,
//   lookup: LookupFn<T, R> = v => void v,
//   validate: ValidateFn<T, R> = async v => void v,
//   errLookup: ErrLookupFn = v => void v
// ) {
//   return [...collection].map((item, index, array) =>
//     fn_a1f9a({
//       item,
//       index,
//       transform,
//       array,
//       lookup,
//       validate,
//       errLookup,
//     })
//   );
// };
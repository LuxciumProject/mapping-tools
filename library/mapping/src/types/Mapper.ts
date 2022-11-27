export interface IMappable<T = any> {
  map: <U = unknown>(callbackfn: Mapper<T, U>) => U[];
}

export type Mapper<T = any, U = unknown, A = T> = (
  value: T,
  index?: number,
  array?: readonly A[]
) => U;

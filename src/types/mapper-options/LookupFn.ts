import type { OnlySideEffect, Settled } from '..';

/**
 * @group Delegates
 * @public
 */
export type LookupFn<S, U = unknown> = (
  value: U,
  index: number,
  array: readonly (PromiseSettledResult<S> | S | Settled<S>)[]
) => OnlySideEffect;

// TASK LIST: [TODO: Types] (Review Documentation) -------------------

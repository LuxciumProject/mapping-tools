import type { OnlySideEffect } from '..';

/**
 * @group Delegates
 *   @public
 */
export type ValidateFn<S, U = unknown> = (
  value: U,
  index: number,
  array: readonly (PromiseSettledResult<S> | S)[]
) => Promise<OnlySideEffect>;

// TASK LIST: [TODO: Types] (Review Documentation) -------------------

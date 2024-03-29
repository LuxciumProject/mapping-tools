/**
 * @group Delegates
 * @public
 */
/*

The TransformFn interface defines a function that can be used to transform a value in a collection. This function takes three arguments:

value: The current value being processed in the collection.
index: The index of the current value in the collection.
array: The array being processed.
The function returns a promise that resolves to the transformed value. This function can be used in conjunction with other functions in the package to apply transformations to a collection of values asynchronously.

 */
// | Promise<ReturnType<() => U>>
export type TransformFn<T, U = unknown> = (
  value: T,
  index: number,
  array: readonly (PromiseSettledResult<T> | T)[]
) => Promise<U> | U;

// TASK LIST: [TODO: Types] (Review Documentation) -------------------

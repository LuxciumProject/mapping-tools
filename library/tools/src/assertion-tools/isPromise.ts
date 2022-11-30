export function isPromiseLike<T>(element: unknown): element is PromiseLike<T> {
  if (element != null && typeof element === 'object' && 'then' in element)
    return true;
  return false;
}

export function isPromise<T>(element: unknown): element is Promise<T> {
  if (isPromiseLike(element) && element instanceof Promise) return true;
  return false;
}

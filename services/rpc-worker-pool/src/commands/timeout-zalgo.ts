import { promisify } from 'node:util';

export function timeoutZalgo<T = void>(
  value?: T | Promise<T> | undefined,
  delay?: number | undefined
) {
  return promisify(setTimeout)(delay, value);
}

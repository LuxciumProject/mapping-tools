import { makeFulfillement } from '../functions/core/makeFulfillement';
import { makeRejection } from '../functions/core/makeRejection';
import { makeSettler } from '../functions/core/proto-makeSettler';
import { isSettled, isSettledRight } from '../helpers/assertions';
import { Settled, SettledRight } from '../types';

describe('proto_makeSettler', () => {
  it('should exist', () => {
    expect(makeSettler).toBeDefined();
  });
  it('should be a function', () => {
    expect(makeSettler).toBeInstanceOf(Function);
  });

  it('should handle T input', () => {
    const result = makeSettler('test', 1);
    // TypeScript Test check for SettledRight
    const expected: SettledRight<string> = result;
    expect(isSettledRight(expected)).toBe(true);
    if (isSettledRight(result)) {
      expect(result.value).toBe('test');
      expect(result.index).toBe(1);
    }
  });
});

describe('should handle PromiseLike input', () => {
  describe('should handle PromiseLike<Settled<T>> input', () => {
    it('should handle makeFulfillement to be a PromiseLike<Settled<T>> input', async () => {
      const settledPromise: PromiseLike<Settled<string>> = Promise.resolve(
        makeFulfillement({ value: 'test' })
      );
      // TypeScript Test check for Promise<Settled<string>>
      const result: Promise<Settled<string>> = makeSettler(settledPromise, 1);
      expect(result).toBeInstanceOf(Promise);

      if (result instanceof Promise) {
        const settled = await result;
        expect(isSettled(settled)).toBe(true);
        if (isSettled(settled) && settled.status === 'fulfilled') {
          expect(settled.value).toBe('test');
          expect(settled.index).toBe(1);
        } else {
          fail('Should be fulfilled');
        }
      } else {
        fail('Should be a Promise');
      }
    });
    it('should handle makeRejection to be a PromiseLike<Settled<T>> input', async () => {
      const settledPromise: PromiseLike<Settled<string>> = Promise.resolve(
        makeRejection({ reason: 'test' })
      );
      const result = makeSettler(settledPromise, 1);
      expect(result).toBeInstanceOf(Promise);

      if (result instanceof Promise) {
        const settled = await result;
        expect(isSettled(settled)).toBe(true);
        if (isSettled(settled) && settled.status === 'rejected') {
          expect(settled.reason).toBe('test');
          expect(settled.index).toBe(1);
        } else {
          fail('Should be rejected');
        }
      } else {
        fail('Should be a Promise');
      }
    });
  });
  it('should handle PromiseLike<SettledRight<T>> input', async () => {
    const settledPromise: PromiseLike<SettledRight<string>> = Promise.resolve(
      makeFulfillement({ value: 'test' })
    );
    const result = makeSettler(settledPromise, 1);
    expect(result).toBeInstanceOf(Promise);

    if (result instanceof Promise) {
      const settled = await result;
      expect(isSettledRight(settled)).toBe(true);
      if (isSettledRight(settled)) {
        expect(settled.value).toBe('test');
        expect(settled.index).toBe(1);
      } else {
        fail('Should be settled right');
      }
    } else {
      fail('Should be a Promise');
    }
  });
  it('should handle PromiseLike<SettledLeft> input', async () => {
    const settledPromise: PromiseLike<Settled<string>> = Promise.resolve(
      makeRejection({ reason: 'test' })
    );
    const result = makeSettler(settledPromise, 1);
    expect(result).toBeInstanceOf(Promise);

    if (result instanceof Promise) {
      const settled = await result;
      expect(isSettled(settled)).toBe(true);
      if (isSettled(settled) && settled.status === 'rejected') {
        expect(settled.reason).toBe('test');
        expect(settled.index).toBe(1);
      } else {
        fail('Should be rejected');
      }
    } else {
      fail('Should be a Promise');
    }
  });
  describe('should handle PromiseLike<T> input', () => {
    it('should handle makeFulfillement to be a PromiseLike<T> input', async () => {
      const promise: PromiseLike<string> = Promise.resolve('test');
      const result: Promise<SettledRight<string>> = makeSettler(promise, 1);
      if (result instanceof Promise) {
        const settled = await result;
        if (isSettledRight(settled)) {
          expect(settled.value).toBe('test');
          expect(settled.index).toBe(1);
        } else {
          expect(isSettledRight(settled)).toBe(true);
          fail('Should be settled right');
        }
      } else {
        expect(result).toBeInstanceOf(Promise);
        fail('Should be a Promise');
      }
    });
    it('should handle PromiseLike<T> input', async () => {
      const promise: PromiseLike<string> = Promise.resolve('test');
      const result: Promise<SettledRight<string>> = makeSettler(promise, 1);
      if (result instanceof Promise) {
        const settled = await result;
        if (isSettledRight(settled)) {
          expect(settled.value).toBe('test');
          expect(settled.index).toBe(1);
        } else {
          expect(isSettledRight(settled)).toBe(true);
          fail('Should be settled right');
        }
      } else {
        expect(result).toBeInstanceOf(Promise);
        fail('Should be a Promise');
      }
    });
  });
});

describe('should handle T Like (non promise) input', () => {
  describe('should handle Settled<T> input', () => {
    it('should handle makeFulfillement to be a Settled<T> input', () => {
      const settled: Settled<string> = makeFulfillement({ value: 'test' });
      const result: Settled<string> = makeSettler(settled, 1);
      expect(isSettled(result)).toBe(true);
      if (isSettled(result)) {
        expect(result.value).toBe('test');
        expect(result.index).toBe(1);
      }
    });

    it('should handle makeRejection to be a Settled<T> input', () => {
      let settled: Settled<string>;
      settled = makeRejection({ reason: 'test' });
      settled;
      const result: Settled<string> = makeSettler(settled, 1);
      expect(isSettled(result)).toBe(true);
      if (isSettled(result)) {
        expect(result.reason).toBe('test');
        expect(result.index).toBe(1);
      }
    });
  });
});

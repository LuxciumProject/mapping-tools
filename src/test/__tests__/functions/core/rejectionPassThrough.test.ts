import { fn_a1f9a } from '../../../../functions/core';

describe('CLAIM 6: Rejection Pass-Through', () => {
  it('Should pass a SettledLeft (rejected item) through without re-transforming', async () => {
    const transformFn = jest.fn(async (x: string) => x.toUpperCase());
    const rejectedItem = {
      status: 'rejected' as const,
      reason: new Error('previous error'),
    };

    const result = await fn_a1f9a({
      item: rejectedItem,
      index: 0,
      array: [rejectedItem],
      transform: transformFn,
    });

    // The transform function must NOT be called on rejected items
    expect(transformFn).not.toHaveBeenCalled();

    // The result should still be rejected
    expect(result.status).toBe('rejected');

    // currentRejection should be false (error was inherited, not from this step)
    expect(result).toHaveProperty('currentRejection', false);

    // The original reason should be preserved
    expect((result as any).reason).toEqual(new Error('previous error'));
  });

  it('Should preserve the index on pass-through of rejected items', async () => {
    const rejectedItem = {
      status: 'rejected' as const,
      reason: 'some error',
    };

    const result = await fn_a1f9a({
      item: rejectedItem,
      index: 5,
      array: [rejectedItem],
    });

    expect(result.status).toBe('rejected');
    expect(result.index).toBe(5);
  });

  it('Should preserve transformStep on pass-through of SettledLeft with transformStep', async () => {
    const settledLeft = {
      status: 'rejected' as const,
      reason: new Error('inherited error'),
      transformStep: 3,
      currentRejection: false,
      index: 2,
    };

    const result = await fn_a1f9a({
      item: settledLeft,
      index: 2,
      array: [settledLeft],
    });

    expect(result.status).toBe('rejected');
    // transformStep should come from the item's own transformStep
    expect((result as any).transformStep).toBe(3);
    // currentRejection should be false (inherited, not current)
    expect(result).toHaveProperty('currentRejection', false);
  });

  it('Should call errLookup with currentRejection=false for pass-through rejections', async () => {
    const errLookupFn = jest.fn();
    const rejectedItem = {
      status: 'rejected' as const,
      reason: 'test error',
    };

    await fn_a1f9a({
      item: rejectedItem,
      index: 0,
      array: [rejectedItem],
      errLookup: errLookupFn,
    });

    expect(errLookupFn).toHaveBeenCalledWith('test error', 0, false);
  });

  it('Should distinguish currentRejection=true (new error) from currentRejection=false (inherited)', async () => {
    // Case 1: New error in this step (currentRejection = true)
    const newErrorResult = await fn_a1f9a({
      item: 'good value',
      index: 0,
      array: ['good value'],
      transform: async () => {
        throw new Error('new error in transform');
      },
    });

    expect(newErrorResult.status).toBe('rejected');
    expect(newErrorResult).toHaveProperty('currentRejection', true);

    // Case 2: Inherited error (currentRejection = false)
    const inheritedErrorResult = await fn_a1f9a({
      item: { status: 'rejected' as const, reason: 'old error' },
      index: 0,
      array: [{ status: 'rejected' as const, reason: 'old error' }],
      transform: async (x: string) => x,
    });

    expect(inheritedErrorResult.status).toBe('rejected');
    expect(inheritedErrorResult).toHaveProperty('currentRejection', false);
  });
});

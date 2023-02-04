import { serialMapping } from '../..';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test serialMapping', async () => {
    expect(await serialMapping([{ item: 10 }])).toStrictEqual([
      {
        // currentRejection: null,
        index: 0,
        transformStep: 1,
        // rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      },
    ]);
  });

  it('Should pass the smoke test serialMapping on rejection', async () => {
    expect(
      await serialMapping([{ item: 10 }], async element => {
        if (element.item === 11) {
          throw element;
        }
      })
    ).toStrictEqual([
      {
        // currentRejection: null,
        index: 0,
        transformStep: 1,
        // rejected: null,
        status: 'fulfilled',
        value: undefined,
      },
    ]);
  });
});

describe('serialMapping', () => {
  it('Should survive when throwing', async () => {
    const result = serialMapping([{ size: 10 }], async obj => {
      if (obj.size === 10) {
        throw new Error('Test error');
      }
    });
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: new Error('Test error'),
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });

  it('Should survive when throwing', async () => {
    const result = serialMapping(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) {
          throw new Error('Test error');
        }
      },
      item => item,
      async item => item,
      reason => reason
    );
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: new Error('Test error'),
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });

  it('Should survive when throwing', async () => {
    const result = serialMapping(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) {
          throw new Error('Test error');
        }
      },
      item => item,
      async item => item,
      undefined
    );
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: new Error('Test error'),
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });
  it('Should survive when throwing with null in each delegates functions', async () => {
    const result = serialMapping(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) {
          throw new Error('Test error');
        }
      },
      null,
      null,
      null
    );
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: new Error('Test error'),
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });

  it('Should be able to recive null in each delegates functions', async () => {
    const result = serialMapping([1, 2, 3], null, null, null, null);
    const expected = [
      { index: 0, status: 'fulfilled', transformStep: 1, value: 1 },
      { index: 1, status: 'fulfilled', transformStep: 1, value: 2 },
      { index: 2, status: 'fulfilled', transformStep: 1, value: 3 },
    ];

    expect(await result).toStrictEqual(expected);
  });
});

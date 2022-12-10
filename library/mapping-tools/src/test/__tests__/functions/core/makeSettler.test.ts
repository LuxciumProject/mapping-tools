import { makeSettler } from '../../../../functions/core/makeSettler';

describe('The makeSettler function', () => {
  it('Should produce a valid output from a T value', async () => {
    expect(makeSettler('expected')).toStrictEqual({
      index: -1,
      status: 'fulfilled',
      transformStep: 0,
      value: 'expected',
    });
  });
  it('Should produce a valid output from a SettledRight<T>', async () => {
    expect(
      makeSettler(
        {
          index: -1,
          status: 'fulfilled',
          transformStep: 0,
          value: 'expected',
        },
        2
      )
    ).toStrictEqual({
      index: 2,
      status: 'fulfilled',
      transformStep: 0,
      value: 'expected',
    });
  });
  it('Should produce a valid output from a SettledLeft', async () => {
    expect(
      makeSettler(
        {
          index: -1,
          status: 'rejected',
          transformStep: 0,
          reason: 'expected',
        },
        2
      )
    ).toStrictEqual({
      index: 2,
      currentRejection: false,
      status: 'rejected',
      transformStep: 0,
      reason: 'expected',
    });
  });
  it('Should produce a valid output from a PromiseFulfilledResult<T> ', async () => {
    expect(
      makeSettler(
        {
          status: 'fulfilled',
          value: 'expected',
        },
        2
      )
    ).toStrictEqual({
      index: 2,
      status: 'fulfilled',
      transformStep: 0,
      value: 'expected',
    });
  });
  it('Should produce a valid output from a PromiseRejectedResult', async () => {
    expect(
      makeSettler(
        {
          status: 'rejected',
          reason: 'expected',
        },
        2
      )
    ).toStrictEqual({
      index: 2,
      currentRejection: false,
      status: 'rejected',
      transformStep: 0,
      reason: 'expected',
    });
  });

  it('Should produce a valid output from a Promise<T> value', async () => {
    expect(await makeSettler((async () => 'expected')())).toStrictEqual({
      index: -1,
      status: 'fulfilled',
      transformStep: 0,
      value: 'expected',
    });
  });
  it('Should produce a valid output from a Promise<SettledRight<T>>', async () => {
    expect(
      await makeSettler(
        (async () => ({
          index: -1,
          status: 'fulfilled',
          transformStep: 0,
          value: 'expected',
        }))(),
        2
      )
    ).toStrictEqual({
      index: 2,
      status: 'fulfilled',
      transformStep: 0,
      value: 'expected',
    });
  });
  it('Should produce a valid output from a Promise<SettledLeft>', async () => {
    expect(
      await makeSettler(
        (async () => ({
          index: -1,
          status: 'rejected',
          transformStep: 0,
          reason: 'expected',
        }))(),
        2
      )
    ).toStrictEqual({
      index: 2,
      currentRejection: false,
      status: 'rejected',
      transformStep: 0,
      reason: 'expected',
    });
  });
  it('Should produce a valid output from a Promise<PromiseFulfilledResult<T>> ', async () => {
    expect(
      await makeSettler(
        (async () => ({
          status: 'fulfilled',
          value: 'expected',
        }))(),
        2
      )
    ).toStrictEqual({
      index: 2,
      status: 'fulfilled',
      transformStep: 0,
      value: 'expected',
    });
  });
  it('Should produce a valid output from a Promise<PromiseRejectedResult>', async () => {
    expect(
      await makeSettler(
        (async () => ({
          status: 'rejected',
          reason: 'expected',
        }))(),
        2
      )
    ).toStrictEqual({
      index: 2,
      currentRejection: false,
      status: 'rejected',
      transformStep: 0,
      reason: 'expected',
    });
  });
});

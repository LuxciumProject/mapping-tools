import { makeSettler } from '../../../functions/core/makeSettler';

describe('Function makeSettler', () => {
  it('Should build from a T value', () => {
    expect(
      makeSettler(
        {
          tom: 'boy',
        },
        0
      )
    ).toStrictEqual({
      index: 0,
      value: {
        tom: 'boy',
      },
      transformStep: 0,
      status: 'fulfilled',
    });
  });
  it('Should build from a Promise<T> value', async () => {
    expect(
      await makeSettler(
        (async () => ({
          tom: 'boy',
        }))(),
        0
      )
    ).toStrictEqual({
      index: 0,
      value: {
        tom: 'boy',
      },
      transformStep: 0,
      status: 'fulfilled',
    });
  });
  it('Should', () => {
    expect(
      makeSettler(
        {
          tom: 'boy',
        },
        10
      )
    ).toStrictEqual({
      index: 10,
      value: {
        tom: 'boy',
      },
      transformStep: 0,
      status: 'fulfilled',
    });
  });
});

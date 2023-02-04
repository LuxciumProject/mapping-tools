import { makeFulfillement } from '../../../../functions/core/makeFulfillement';

describe('Internal core function makeFulfillement', () => {
  it('Should take only a valu to produce the output', done => {
    expect(
      makeFulfillement({
        value: 'any',
      })
    ).toStrictEqual({
      value: 'any',
      status: 'fulfilled',
    });
    done();
  });
});

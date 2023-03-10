import { FULFILLED, REJECTED } from '../../../../constants';
import { fulfillementBlock } from '../../../../functions/core/fulfillementBlock';

describe('DESCRIBE', () => {
  it('Should make fulfillementBlock from a promise', async () => {
    expect(
      await fulfillementBlock(
        {
          status: FULFILLED,
          value: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: null,
          transformStep: 0,
          index: 0,
        },
        2,
        [
          {
            status: FULFILLED,
            value: null,
            [FULFILLED]: null,
            [REJECTED]: null,
            currentRejection: null,
            transformStep: 0,
            index: 0,
          },
        ]
      )
    ).toStrictEqual({
      // currentRejection: null,
      index: 2,
      // rejected: null,
      status: 'fulfilled',
      transformStep: 1,
      value: null,
    });
  });
  it('Should make fulfillementBlock from -1 index', async () => {
    expect(
      await fulfillementBlock(
        {
          status: FULFILLED,
          value: null,
          [FULFILLED]: null,
          [REJECTED]: null,
          currentRejection: null,
          transformStep: -2,
          index: 0,
        },
        -1,
        [
          {
            status: FULFILLED,
            value: null,
            [FULFILLED]: null,
            [REJECTED]: null,
            currentRejection: null,
            transformStep: -2,
            index: 0,
          },
        ]
      )
    ).toStrictEqual({
      // currentRejection: null,
      // index: 2,
      // rejected: null,
      status: 'fulfilled',
      // transformStep: 1,
      value: null,
    });
  });
});

// describe.skip('Sanity check Level 1 fulfillementBlock', () => {
//   it.skip('Should make fulfillementBlock from a promise', async () => {});

//   // it.skip('Should make fulfillementBlock from a promise', async () => {
//   //   expect(
//   //     await fulfillementBlock(
//   //       (async () => ({
//   //         status: FULFILLED,
//   //         value: null,
//   //         [FULFILLED]: null,
//   //         [REJECTED]: null,
//   //         currentRejection: null,
//   //         transformStep: 0,
//   //         index: 0,
//   //       }))(),
//   //       -1,
//   //       [
//   //         {
//   //           status: FULFILLED,
//   //           value: 10,
//   //           [FULFILLED]: 10,
//   //           [REJECTED]: null,
//   //           currentRejection: null,
//   //           transformStep: 0,
//   //           index: 0,
//   //         },
//   //       ]
//   //     )
//   //   ).toStrictEqual({
//   //     // currentRejection: null,
//   //     index: -1,
//   //     // rejected: null,
//   //     status: 'fulfilled',
//   //     transformStep: 1,
//   //     value: null,
//   //   });

//   // it('Should pass isSettled with a settledRight', async () => {
//   //   expect(
//   //     await fulfillementBlock(
//   //       {
//   //         status: FULFILLED,
//   //         value: null,
//   //         [FULFILLED]: null,
//   //         [REJECTED]: null,
//   //         currentRejection: null,
//   //         transformStep: 0,
//   //         index: 0,
//   //       },
//   //       -1,
//   //       [
//   //         {
//   //           status: FULFILLED,
//   //           value: 10,
//   //           [FULFILLED]: 10,
//   //           [REJECTED]: null,
//   //           currentRejection: null,
//   //           transformStep: 0,
//   //           index: 0,
//   //         },
//   //       ]
//   //     )
//   //   ).toStrictEqual({
//   //     // currentRejection: null,
//   //     index: -1,
//   //     // rejected: null,
//   //     status: 'fulfilled',
//   //     transformStep: 1,
//   //     value: null,
//   //   });
//   // });

//   // it.each([
//   //   [
//   //     fulfillementBlock(10, 0, [10], 0),
//   //     {
//   //       // currentRejection: null,
//   //       index: 0,
//   //       transformStep: 1,
//   //       // rejected: null,
//   //       status: 'fulfilled',
//   //       value: 10,
//   //     },
//   //   ],
//   //   [
//   //     fulfillementBlock(
//   //       {
//   //         status: 'fulfilled',
//   //         value: 10,
//   //         reason: undefined,
//   //         fulfilled: 10,
//   //         // rejected: null,
//   //         // currentRejection: null,
//   //         transformStep: -1,
//   //       },
//   //       0,
//   //       [10]
//   //     ),
//   //     {
//   //       // currentRejection: null,
//   //       index: 0,
//   //       transformStep: -1,
//   //       // rejected: null,
//   //       status: 'fulfilled',
//   //       value: 10,
//   //     },
//   //   ],
//   //   [
//   //     fulfillementBlock(
//   //       {
//   //         status: 'fulfilled',
//   //         value: 10,
//   //       },
//   //       0,
//   //       [10]
//   //     ),
//   //     {
//   //       // currentRejection: null,
//   //       index: 0,
//   //       transformStep: -1,
//   //       // rejected: null,
//   //       status: 'fulfilled',
//   //       value: 10,
//   //     },
//   //   ],
//   // ])(
//   //   'Should pass the smoke test fulfillementBlock',
//   //   async (contender, expected) => {
//   //     expect(await contender).toStrictEqual(expected);
//   //   }
//   // );
// });

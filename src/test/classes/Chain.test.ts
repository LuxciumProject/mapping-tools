import { Chain, chain } from '../..';

describe('Chain - Fluent API', () => {
  describe('Factory methods', () => {
    it('Should create a chain using Chain.of()', async () => {
      const result = await Chain.of([1, 2, 3]).getValues();
      expect(result).toEqual([1, 2, 3]);
    });

    it('Should create a chain using chain() helper function', async () => {
      const result = await chain([1, 2, 3]).getValues();
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('Chainable transformations', () => {
    it('Should chain multiple awaitedMapping operations', async () => {
      const result = await chain([1, 2, 3, 4, 5])
        .awaitedMapping(async x => x * 2)
        .awaitedMapping(async x => x + 1)
        .getValues();
      expect(result).toEqual([3, 5, 7, 9, 11]);
    });

    it('Should chain serialMapping operations', async () => {
      const result = await chain([1, 2, 3])
        .serialMapping(async x => x * 3)
        .serialMapping(async x => x - 1)
        .getValues();
      expect(result).toEqual([2, 5, 8]);
    });

    it('Should chain different mapping types', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => x * 2)
        .serialMapping(async x => x + 10)
        .getValues();
      expect(result).toEqual([12, 14, 16]);
    });
  });

  describe('Value extraction methods', () => {
    it('Should extract values using getValues()', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => x * 2)
        .getValues();
      expect(result).toEqual([2, 4, 6]);
    });

    it('Should extract array using toArray()', async () => {
      const result = await chain([1, 2])
        .awaitedMapping(async x => x * 2)
        .toArray();
      
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        status: 'fulfilled',
        value: 2,
      });
      expect(result[1]).toMatchObject({
        status: 'fulfilled',
        value: 4,
      });
    });

    it('Should handle rejections with getAllValues()', async () => {
      const result = await chain([1, 2, 3, 4])
        .awaitedMapping(async x => {
          if (x === 2) throw new Error('Test error');
          return x * 2;
        })
        .getAllValues();
      
      expect(result).toHaveLength(4);
      expect(result[0]).toBe(2);
      expect(typeof result[1]).toBe('symbol'); // NULL_SYMBOL
      expect(result[2]).toBe(6);
      expect(result[3]).toBe(8);
    });

    it('Should filter fulfilled values correctly', async () => {
      const result = await chain([1, 2, 3, 4])
        .awaitedMapping(async x => {
          if (x === 2 || x === 3) throw new Error('Test error');
          return x * 2;
        })
        .getValues();
      
      expect(result).toEqual([2, 8]);
    });
  });

  describe('Error handling in chains', () => {
    it('Should handle errors in transformation chain', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => {
          if (x === 2) throw new Error('Error at 2');
          return x * 2;
        })
        .toArray();
      
      expect(result).toHaveLength(3);
      expect(result[0].status).toBe('fulfilled');
      expect(result[1].status).toBe('rejected');
      expect(result[2].status).toBe('fulfilled');
    });

    it('Should preserve errors through multiple transformations', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => {
          if (x === 2) throw new Error('Error at 2');
          return x * 2;
        })
        .awaitedMapping(async x => x + 1)
        .toArray();
      
      expect(result).toHaveLength(3);
      expect(result[0].status).toBe('fulfilled');
      expect(result[1].status).toBe('rejected');
      expect(result[2].status).toBe('fulfilled');
    });
  });

  describe('Complex transformation chains', () => {
    it('Should handle complex async operations', async () => {
      const result = await chain([1, 2, 3, 4, 5])
        .awaitedMapping(async x => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return x * 2;
        })
        .awaitedMapping(async x => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return x + 10;
        })
        .getValues();
      
      expect(result).toEqual([12, 14, 16, 18, 20]);
    });

    it('Should work with promises as input', async () => {
      const promisedArray = Promise.resolve([10, 20, 30]);
      const result = await chain(promisedArray)
        .awaitedMapping(async x => x / 10)
        .getValues();
      
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('Backwards compatibility', () => {
    it('Should still support extractFulfilledValues()', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => x * 2)
        .extractFulfilledValues();
      expect(result).toEqual([2, 4, 6]);
    });

    it('Should still support extractSettledValues()', async () => {
      const result = await chain([1, 2])
        .awaitedMapping(async x => x * 2)
        .extractSettledValues();
      expect(result).toEqual([2, 4]);
    });

    it('Should still support filterRight()', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => {
          if (x === 2) throw new Error('Test');
          return x;
        })
        .filterRight();
      
      expect(result).toHaveLength(2);
      expect(result[0].value).toBe(1);
      expect(result[1].value).toBe(3);
    });

    it('Should still support filterLeft()', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => {
          if (x === 2) throw new Error('Test');
          return x;
        })
        .filterLeft();
      
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('rejected');
    });
  });
});

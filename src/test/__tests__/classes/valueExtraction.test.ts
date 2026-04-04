import { NULL_SYMBOL } from '../../../constants';
import { chain } from '../../../index';

describe('CLAIM 7: Value Extraction Consistency', () => {
  describe('getValues() semantics', () => {
    it('Should return only fulfilled values, excluding rejected entries', async () => {
      const result = await chain([1, 2, 3, 4])
        .awaitedMapping(async x => {
          if (x === 2 || x === 4) throw new Error('reject');
          return x * 10;
        })
        .getValues();

      // Only fulfilled values are returned
      expect(result).toEqual([10, 30]);
    });

    it('Should return all values when nothing is rejected', async () => {
      const result = await chain([1, 2, 3]).getValues();
      expect(result).toEqual([1, 2, 3]);
    });

    it('Should return empty array when all items are rejected', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async () => {
          throw new Error('all fail');
        })
        .getValues();

      expect(result).toEqual([]);
    });
  });

  describe('getAllValues() semantics', () => {
    it('Should return all values with NULL_SYMBOL for rejected entries', async () => {
      const result = await chain([1, 2, 3, 4])
        .awaitedMapping(async x => {
          if (x === 2 || x === 4) throw new Error('reject');
          return x * 10;
        })
        .getAllValues();

      // Preserves original array length
      expect(result).toHaveLength(4);
      // Fulfilled values are returned
      expect(result[0]).toBe(10);
      // Rejected entries produce NULL_SYMBOL
      expect(result[1]).toBe(NULL_SYMBOL);
      expect(result[2]).toBe(30);
      expect(result[3]).toBe(NULL_SYMBOL);
    });

    it('Should return all values when nothing is rejected', async () => {
      const result = await chain([1, 2, 3]).getAllValues();
      expect(result).toEqual([1, 2, 3]);
    });

    it('Should return all NULL_SYMBOLs when all items are rejected', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async () => {
          throw new Error('all fail');
        })
        .getAllValues();

      expect(result).toHaveLength(3);
      expect(result.every(v => v === NULL_SYMBOL)).toBe(true);
    });
  });

  describe('toArray() semantics', () => {
    it('Should return settled array with status for each entry', async () => {
      const result = await chain([1, 2, 3])
        .awaitedMapping(async x => {
          if (x === 2) throw new Error('reject');
          return x * 10;
        })
        .toArray();

      // Preserves original array length
      expect(result).toHaveLength(3);

      // Fulfilled entries have status='fulfilled' and value
      expect(result[0]).toMatchObject({ status: 'fulfilled', value: 10 });
      expect(result[2]).toMatchObject({ status: 'fulfilled', value: 30 });

      // Rejected entries have status='rejected' and reason
      expect(result[1]).toMatchObject({ status: 'rejected' });
      expect((result[1] as any).reason).toEqual(new Error('reject'));
    });

    it('Should return settled results even with no transformations', async () => {
      const result = await chain([10, 20])
        .awaitedMapping(async x => x)
        .toArray();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ status: 'fulfilled', value: 10 });
      expect(result[1]).toMatchObject({ status: 'fulfilled', value: 20 });
    });

    it('Should include index and transformStep in settled results', async () => {
      const result = await chain([10, 20])
        .awaitedMapping(async x => x)
        .toArray();

      expect(result[0]).toMatchObject({
        status: 'fulfilled',
        value: 10,
        index: 0,
        transformStep: 1,
      });
      expect(result[1]).toMatchObject({
        status: 'fulfilled',
        value: 20,
        index: 1,
        transformStep: 1,
      });
    });
  });

  describe('Consistency between extraction methods', () => {
    it('getValues() length should be <= getAllValues() length', async () => {
      const c = chain([1, 2, 3, 4]).awaitedMapping(async x => {
        if (x % 2 === 0) throw new Error('even');
        return x;
      });

      const values = await c.getValues();
      const allValues = await c.getAllValues();

      expect(values.length).toBeLessThanOrEqual(allValues.length);
      // getAllValues preserves positions, getValues filters
      expect(allValues).toHaveLength(4);
      expect(values).toHaveLength(2);
    });

    it('toArray() and getAllValues() should have same length', async () => {
      const c = chain([1, 2, 3]).awaitedMapping(async x => {
        if (x === 2) throw new Error('fail');
        return x * 10;
      });

      const arr = await c.toArray();
      const allValues = await c.getAllValues();

      expect(arr).toHaveLength(allValues.length);
    });

    it('getValues() should match fulfilled values from toArray()', async () => {
      const c = chain([1, 2, 3, 4, 5]).awaitedMapping(async x => {
        if (x === 2 || x === 4) throw new Error('fail');
        return x * 10;
      });

      const values = await c.getValues();
      const arr = await c.toArray();
      const fulfilledFromArray = arr
        .filter(s => s.status === 'fulfilled')
        .map(s => (s as any).value);

      expect(values).toEqual(fulfilledFromArray);
    });

    it('getAllValues() NULL_SYMBOL positions should match rejected entries in toArray()', async () => {
      const c = chain([1, 2, 3, 4]).awaitedMapping(async x => {
        if (x === 2 || x === 3) throw new Error('fail');
        return x;
      });

      const allValues = await c.getAllValues();
      const arr = await c.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].status === 'rejected') {
          expect(allValues[i]).toBe(NULL_SYMBOL);
        } else {
          expect(allValues[i]).not.toBe(NULL_SYMBOL);
        }
      }
    });
  });
});

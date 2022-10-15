import { default as humanSize } from '.';

describe('Validate 1000B vs. 1024B', () => {
  it('Should be less than 1KB when it is 1000B', () => {
    expect(humanSize(1000)).toBe('1000B');
  });
  it('Should be 1KB when it is 1024B', () => {
    expect(humanSize(1024)).toBe('1KB');
  });
});
describe("Check suffixes for power of 1024  Suffix of type '' | K | M | G | T | P | E | Z | Y", () => {
  it("Sould have 'B' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 0))).toBe('10B');
  });
  it("Sould have 'KB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 1))).toBe('10KB');
  });
  it("Sould have 'MB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 2))).toBe('10MB');
  });
  it("Sould have 'GB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 3))).toBe('10GB');
  });
  it("Sould have 'TB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 4))).toBe('10TB');
  });
  it("Sould have 'PB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 5))).toBe('10PB');
  });
  it("Sould have 'EB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 6))).toBe('10EB');
  });
  it("Sould have 'ZB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 7))).toBe('10ZB');
  });
  it("Sould have 'YB' as its suffix", () => {
    expect(humanSize(10 * Math.pow(1024, 8))).toBe('10YB');
  });
  it("Sould have 'YB' as its suffix for number larger than 1024⁹", () => {
    expect(humanSize(10 * Math.pow(1024, 9))).toBe('10240YB');
  });
  it('Check suffixes for power of 1000', () => {
    // ' ' | 'K' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y';
    expect(humanSize(10 * Math.pow(1000, 0))).toBe('10B');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 1))).toBe('10KB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 2))).toBe('10MB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 3))).toBe('9GB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 4))).toBe('9TB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 5))).toBe('9PB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 6))).toBe('9EB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 7))).toBe('8ZB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 8))).toBe('8YB');
  });
  it('description', () => {
    expect(humanSize(10 * Math.pow(1000, 9))).toBe('8272YB');
  });
});

describe('description', () => {
  let b = 1.345_678_929;
  it('description', () => {
    expect(humanSize(Math.pow(1024, 0) * b, 0)).toBe('1B');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 1) * b, 1)).toBe('1.3KB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 2) * b, 2)).toBe('1.35MB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 3) * b, 3)).toBe('1.346GB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 4) * b, 4)).toBe('1.3457TB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 5) * b, 5)).toBe('1.34568PB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 6) * b, 6)).toBe('1.345679EB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 7) * b, 7)).toBe('1.3456789ZB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 8) * b, 8)).toBe('1.34567893YB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 9) * b, 9)).toBe(
      '1377.975223296YB'
    );
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 10) * b, 10)).toBe(
      '1411046.6286551040YB'
    );
  });
});

describe('description', () => {
  let b = 1_533_333_333;
  it('description', () => {
    expect(humanSize(103 * 1024 ** 3 + b, 2)).toBe('104.43GB');
  });
  it('description', () => {
    expect(humanSize(106_168, 2)).toBe('103.68KB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 8) * 4.4, 1)).toBe('4.4YB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 9) * 1.4, 1)).toBe('1433.6YB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 9) * 1.4, 2)).toBe('1433.60YB');
  });
  it('description', () => {
    expect(humanSize(Math.pow(1024, 0) * 142.69, 1)).toBe('142.7B');
  });

  // /* Failling test: */ expect(1, 2);
});

import { default as humanSize } from '.';

describe('Validate examples in readme file', () => {
  it('Should print "10MB"', () => {
    expect(humanSize(10 * 1024 * 1024)).toBe('10MB');
  });
  it('Should print "10.00MB"', () => {
    expect(humanSize(10 * 1024 * 1024, 2)).toBe('10.00MB');
  });
  it('Should print "104KB"', () => {
    expect(humanSize(106_168)).toBe('104KB');
  });
  it('Should print "103.68KB"', () => {
    expect(humanSize(106_168, 2)).toBe('103.68KB');
  });
});

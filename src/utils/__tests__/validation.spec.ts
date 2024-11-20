import { parseNumber } from '@/utils/validation.ts';

describe('validation', () => {
  const numbers = ['0', '1', '1000', '9'.repeat(100)];

  it.each(numbers)('number "%s" should parse', (number) => {
    expect(parseNumber(number)).toEqual(number);
  });

  const nonNumbers = ['', ' 1', 'a1000'];

  it.each(nonNumbers)('non-number "%s" should not parse', (nonNumber) => {
    expect(parseNumber(nonNumber)).toEqual(undefined);
  });
});

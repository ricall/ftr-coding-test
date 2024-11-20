import { isOneOfTheFirst1000FibonacciNumbers } from '@/utils/fibonacci.ts';

describe('fibonacci', () => {
  const fibonacciNumbers = ['1', '2', '3', '5', '8', '13', '18547707689471986212190138521399707760'];

  it.each(fibonacciNumbers)('fibonacci number "%s"', (number: string) => {
    expect(isOneOfTheFirst1000FibonacciNumbers(number)).toBeTruthy();
  });

  const nonFibonacciNumbers = ['-1', '4', '6', '7', '9'];

  it.each(nonFibonacciNumbers)('nonFibonacciNumbers number "%s"', (number: string) => {
    expect(isOneOfTheFirst1000FibonacciNumbers(number)).toBeFalsy();
  });
});

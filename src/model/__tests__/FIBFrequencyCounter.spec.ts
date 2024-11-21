import { FrequencyCounter } from '@/model/FrequencyCounter.ts';
import { beforeEach } from 'vitest';
import { FIBFrequencyCounter } from '@/model/FIBFrequencyCounter.ts';

describe('FIBFrequencyCounter', () => {
  const publishEvent = vi.fn();
  const addItem = vi.fn();
  const getFrequencies = vi.fn();
  let counter: FrequencyCounter;

  beforeEach(() => {
    vi.resetAllMocks();
    counter = new FIBFrequencyCounter({ addItem, getFrequencies }, publishEvent);
    getFrequencies.mockReturnValue({ '1': 100 });
  });

  it('should raise a FIB validation event for a fibonacci number', () => {
    counter.addItem('1');

    expect(addItem).toBeCalledWith('1');
    expect(publishEvent).toBeCalledWith({ type: 'validation', message: 'FIB' });
  });

  it('should not trigger a validation event when the item is not a fibonacci number', () => {
    counter.addItem('31');

    expect(addItem).toBeCalledWith('31');
    expect(publishEvent).toBeCalledTimes(0);
  });

  it('should return the frequencies from the underlying counter', () => {
    expect(counter.getFrequencies()).toStrictEqual({ '1': 100 });
    expect(getFrequencies).toBeCalledTimes(1);
  });
});

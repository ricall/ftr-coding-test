import { SimpleFrequencyCounter, FrequencyCounter, frequenciesToString } from '@/model/FrequencyCounter.ts';

describe('FrequencyCounter', () => {
  let counter: FrequencyCounter;

  beforeEach(() => {
    counter = new SimpleFrequencyCounter();
  });

  it('should be empty to start with', () => {
    expect(frequenciesToString(counter.getFrequencies())).toEqual('');
  });

  it('should count frequencies', () => {
    counter.addItem('100');
    counter.addItem('200');
    counter.addItem('100');

    expect(frequenciesToString(counter.getFrequencies())).toEqual('100:2, 200:1');
  });
});

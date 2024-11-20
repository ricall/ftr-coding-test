import { EventSink } from '@/model/Event.ts';
import { FrequencyCounter } from '@/model/FrequencyCounter.ts';
import { isOneOfTheFirst1000FibonacciNumbers } from '@/utils/fibonacci.ts';

export class FIBFrequencyCounter implements FrequencyCounter {
  private readonly counter: FrequencyCounter;
  private readonly publishEvent: EventSink<'validation'>;

  constructor(counter: FrequencyCounter, sink: EventSink<'validation'>) {
    this.counter = counter;
    this.publishEvent = sink;
  }

  addItem(value: string) {
    if (isOneOfTheFirst1000FibonacciNumbers(value)) {
      this.publishEvent({ type: 'validation', message: 'FIB' });
    }
    this.counter.addItem(value);
  }

  getFrequencies() {
    return this.counter.getFrequencies();
  }
}

import { frequenciesToString, FrequencyCounter } from '@/model/FrequencyCounter.ts';
import { EventSink } from '@/model/Event.ts';

const MILLISECONDS_PER_SECOND = 1_000;

export class FrequencyTimer {
  private readonly counter: FrequencyCounter;
  private readonly frequency: number;
  private readonly publishEvent: EventSink<'timer'>;
  private timer: NodeJS.Timeout | undefined;

  constructor(counter: FrequencyCounter, frequencyInMilliseconds: number, publishEvent: EventSink<'timer'>) {
    this.counter = counter;
    this.frequency = frequencyInMilliseconds;
    this.publishEvent = publishEvent;
    this.reschedule();
  }

  start() {
    this.publishEvent({ type: 'timer', message: 'timer resumed' });

    clearTimeout(this.timer);
    this.reschedule();
  }

  stop() {
    this.publishEvent({ type: 'timer', message: 'timer halted' });

    clearTimeout(this.timer);
  }

  quit() {
    clearTimeout(this.timer);
  }

  private reschedule() {
    this.timer = setTimeout(() => this.onTimeout(), this.frequency * MILLISECONDS_PER_SECOND);
  }

  private onTimeout() {
    this.publishEvent({ type: 'timer', message: frequenciesToString(this.counter.getFrequencies()) });
    this.reschedule();
  }
}

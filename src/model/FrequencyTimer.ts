import { frequenciesToString, FrequencyCounter } from '@/model/FrequencyCounter.ts';
import { EventSink } from '@/model/Event.ts';

export class FrequencyTimer {
  private readonly counter: FrequencyCounter;
  private readonly frequency: number;
  private readonly publishEvent: EventSink<'timer'>;
  private timer: NodeJS.Timeout | undefined;

  constructor(counter: FrequencyCounter, frequency: number, sink: EventSink<'timer'>) {
    this.counter = counter;
    this.frequency = frequency;
    this.publishEvent = sink;
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
    this.timer = setTimeout(() => this.onTimeout(), this.frequency * 1_000);
  }

  private onTimeout() {
    this.publishEvent({ type: 'timer', message: frequenciesToString(this.counter.getFrequencies()) });
    this.reschedule();
  }
}

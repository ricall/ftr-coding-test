import { afterEach, beforeEach } from 'vitest';
import { FrequencyTimer } from '@/model/FrequencyTimer.ts';

describe('FrequencyTimer', () => {
  const getFrequencies = vi.fn();
  const publishEvent = vi.fn();
  let timer: FrequencyTimer;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 1, 1, 12, 0, 0, 0));
    timer = new FrequencyTimer({ getFrequencies, addItem: vi.fn() }, 5, publishEvent);
    getFrequencies.mockReturnValueOnce({ '1': 2, '2': 20 }).mockReturnValue({ '1': 3, '2': 21 });
  });

  afterEach(() => {
    vi.useRealTimers();
    timer.quit();
  });

  it('should raise timer events', () => {
    vi.advanceTimersByTime(6000);
    expect(publishEvent).toBeCalledWith({ type: 'timer', message: '2:20, 1:2' });
  });

  it('should be possible to stop the timer', () => {
    timer.stop();
    vi.advanceTimersByTime(6000);
    expect(publishEvent).toBeCalledTimes(1);
    expect(publishEvent).toBeCalledWith({ type: 'timer', message: 'timer halted' });
  });

  it('should be possible to start/stop the timer multiple times', () => {
    timer.stop();
    vi.advanceTimersByTime(6000);
    expect(publishEvent).toBeCalledTimes(1);
    expect(publishEvent).toBeCalledWith({ type: 'timer', message: 'timer halted' });

    timer.start();
    vi.advanceTimersByTime(6000);
    expect(publishEvent).toBeCalledTimes(3);
    expect(publishEvent).toBeCalledWith({ type: 'timer', message: 'timer resumed' });
    expect(publishEvent).toBeCalledWith({ type: 'timer', message: '2:20, 1:2' });

    timer.stop();
    vi.advanceTimersByTime(6000);
    expect(publishEvent).toBeCalledTimes(4); // 2nd 'timer halted'

    timer.start();
    vi.advanceTimersByTime(6000);
    expect(publishEvent).toBeCalledTimes(6); // 2nd 'timer resumed' + timeout event
    expect(publishEvent).toBeCalledWith({ type: 'timer', message: '2:21, 1:3' });
  });
});

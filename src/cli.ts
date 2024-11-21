import { Event } from '@/model/Event';
import { frequenciesToString, SimpleFrequencyCounter } from '@/model/FrequencyCounter.ts';
import { FIBFrequencyCounter } from '@/model/FIBFrequencyCounter.ts';
import { FrequencyTimer } from '@/model/FrequencyTimer.ts';
import { parseNumber } from '@/utils/validation.ts';
import { promptUser } from '@/utils/promptUser.ts';
import { EOL } from 'node:os';

const log = (message: string) => console.log(`>> ${message}`);
const publishEvent = ({ message }: Event<'validation' | 'timer'>) => log(message);

const getFrequencyFromUser = async (): Promise<number> => {
  let frequency: string | undefined = undefined;
  while (frequency === undefined) {
    const text = await promptUser(`>> Please input the amount of time in seconds before emitting numbers and their frequency${EOL}`);
    frequency = parseNumber(text ?? '');
    if (frequency === undefined) {
      console.log('Invalid frequency', text);
    }
  }
  return parseInt(frequency, 10) ?? 0;
};

const main = async () => {
  const frequency = await getFrequencyFromUser();
  const counter = new FIBFrequencyCounter(new SimpleFrequencyCounter(), publishEvent);
  const timer = new FrequencyTimer(counter, frequency, publishEvent);

  log('Please enter the first number');
  let running = true;
  while (running) {
    const text = (await promptUser()) ?? '';

    switch (text) {
      case 'halt':
        timer.stop();
        break;
      case 'resume':
        timer.start();
        break;
      case 'quit':
        timer.quit();
        running = false;
        break;

      default: {
        const value = parseNumber(text);
        if (value === undefined) {
          log(`Invalid number ${text}`);
          break;
        }
        counter.addItem(value);
        log('Please enter the next number');
        break;
      }
    }
  }
  log(frequenciesToString(counter.getFrequencies()));
};

main()
  .then(() => {
    log('Thanks for playing');
    process.exit();
  })
  .catch((error) => console.error('failed', error));

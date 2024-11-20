export type EventType = 'validation' | 'timer';

export type Event<T extends EventType> = {
  type: T;
  message: string;
};

export type EventSink<T extends EventType> = (event: Event<T>) => void;

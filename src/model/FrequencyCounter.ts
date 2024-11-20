export type Frequencies = Record<string, number>;

export type FrequencyCounter = {
  addItem: (value: string) => void;
  getFrequencies: () => Frequencies;
};

export class SimpleFrequencyCounter implements FrequencyCounter {
  private readonly frequencies: Frequencies = {};

  public addItem(value: string) {
    this.frequencies[value] = (this.frequencies[value] ?? 0) + 1;
  }

  public getFrequencies() {
    return this.frequencies;
  }
}

export const frequenciesToString = (frequencies: Record<string, number>) =>
  Object.entries(frequencies)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => `${key}:${value}`)
    .join(', ');

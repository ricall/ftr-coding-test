import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const promptUser = async (message: string = '') => rl.question(message);

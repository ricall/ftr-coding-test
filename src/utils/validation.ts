export const parseNumber = (text: string): string | undefined => {
  if (text.match(/^[0-9]+$/)) {
    return text;
  }
  return undefined;
};

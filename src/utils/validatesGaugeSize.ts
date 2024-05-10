export const validatesGaugeSize = (current: number, original: number) => {
  if (current < 0 || current > original) {
    return original;
  }
  return current;
};

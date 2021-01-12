const range = function (
  num: number,
  [min, max]: [number, number]
): number {
  return Math.max(min, Math.min(max, num));
};

export {
  range
};

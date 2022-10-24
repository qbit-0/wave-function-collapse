export const scale = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

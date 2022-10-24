export const weightedRandom = <T>(items: T[], weights: number[]) => {
  const cumulativeWeights: number[] = [];
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = Math.random() * maxCumulativeWeight;

  const targetIndex = items.findIndex(
    (_, itemIndex) => cumulativeWeights[itemIndex] >= randomNumber
  );

  return {
    item: items[targetIndex],
    index: targetIndex,
  };
};

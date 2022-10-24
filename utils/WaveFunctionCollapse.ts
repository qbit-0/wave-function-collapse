import { scale } from "./scale";
import { weightedRandom } from "./weightedRandom";

export const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
] as const;

export type Dir = typeof DIRS[number];

export type Tile = { name: string; value: string; ratio: number };
export type Tileset = { tiles: Tile[] };
export type Rules = number[][][];
export type Domain = number[];

export type World = {
  width: number;
  height: number;
  tileset: Tileset;
  rules: Rules;
  ratioAdherence: number;
  minEntropyRange: number;
  domains: Domain[];
  entropies: number[];
  tileProbSums: number[];
};

export const getCell = <T>(x: number, y: number, cells: T[], world: World) =>
  cells[y * world.width + x];

export const setCell = <T>(
  x: number,
  y: number,
  cells: T[],
  world: World,
  value: T
) => {
  cells[y * world.width + x] = value;
};

export const getPos = (index: number, world: World) => {
  const x = index % world.width;
  const y = Math.floor(index / world.width);
  return [x, y];
};

export const checkBounds = (x: number, y: number, world: World) =>
  x >= 0 && x < world.width && y >= 0 && y < world.height;

export const wrapBounds = (x: number, y: number, world: World) => [
  ((x % world.width) + world.width) % world.width,
  ((y % world.height) + world.height) % world.height,
];

export const getEntropy = (domain: Domain, tileset: Tileset) => {
  const [sumOfWeights, sumOfWightMultLogWeight] = domain.reduce(
    ([sumOfWeights, sumOfWightMultLogWeight], tileProb, tileId) => {
      if (!tileProb) return [sumOfWeights, sumOfWightMultLogWeight];
      const weight = tileProb;
      return [
        sumOfWeights + weight,
        sumOfWightMultLogWeight + weight * Math.log(weight),
      ];
    },
    [0, 0]
  );

  if (sumOfWeights === 0) return 0;
  return Math.log(sumOfWeights) - sumOfWightMultLogWeight / sumOfWeights;
};

// export const cutTileset = (src: string, size: number): Tileset => {
//   const image = new Image();
//   image.src = src;
//   image.onload;

//   Promise.all([createImageBitmap(image), createImageBitmap(image)]).then(
//     (sprites) => {}
//   );
// };

// export const cutSample = (srcImg: string, size: number): Sample => {
//   const width = 0;
//   const height = 0;
//   const tileset = cutTileset(srcImg, size);
//   const values: number[] = [];
//   return {
//     width,
//     height,
//     tileset,
//     tileIds: values,
//   };
// };

// export const calcRules = (sample: Sample): Rules => {
//   const { tileset, tileIds } = sample;

//   const rules = tileset.tiles.map(() =>
//     DIRS.map(() => tileset.tiles.map(() => false))
//   );

//   tileIds.forEach((tileId, cellIndex) => {
//     const [x, y] = getPos(cellIndex, sample);
//     DIRS.forEach((offset, dirIndex) => {
//       const [adjX, adjY] = [x + offset[0], y + offset[1]];
//       if (!checkBounds(adjX, adjY, sample)) return;
//       const adjTileId = getCell(adjX, adjY, tileIds, sample);
//       rules[tileId][dirIndex][adjTileId];
//     });
//   });

//   return rules;
// };

export const resetWorld = (world: World) => {
  const { width, height, tileset } = world;

  const domains = [];
  for (let i = 0; i < width * height; i++) {
    domains[i] = tileset.tiles.map((tile) => tile.ratio);
  }

  const initialEntropy = getEntropy(
    tileset.tiles.map((tile) => tile.ratio),
    tileset
  );

  const entropies: number[] = new Array(width * height).fill(initialEntropy);
  const tileProbSum = tileset.tiles.map((tile) => tile.ratio * width * height);

  world.domains = domains;
  world.entropies = entropies;
  world.tileProbSums = tileProbSum;
};

const updateCell = (x: number, y: number, world: World) => {
  const {
    width,
    height,
    tileset,
    rules,
    ratioAdherence,
    domains,
    entropies,
    tileProbSums,
  } = world;

  const domain = getCell(x, y, domains, world);

  let tileEliminated = false;
  const preNormalizedDomain = domain.map((tileProb, tileId) => {
    if (tileProb === 0) return 0;
    const targetRatio = tileset.tiles[tileId].ratio;
    const currRatio = tileProbSums[tileId] / (width * height);
    const ratioDiff = targetRatio - currRatio;
    const ratioFactor = scale(Math.abs(ratioDiff), 0, 1, 1, ratioAdherence);
    const ratioMult =
      Math.sign(ratioDiff) === 1 ? ratioFactor : 1 / ratioFactor;

    const nextTileProbability =
      ratioMult *
      DIRS.reduce((partialCombinedProbability, offset, dirIndex) => {
        const [rawAdjX, rawAdjY] = [x - offset[0], y - offset[1]];
        const [adjX, adjY] = wrapBounds(rawAdjX, rawAdjY, world);
        const adjDomain = getCell(adjX, adjY, domains, world);
        return (
          partialCombinedProbability *
          adjDomain.reduce(
            (partialDirectionalProbability, adjTileProbablity, adjTileId) => {
              const prob =
                adjTileProbablity * rules[adjTileId][dirIndex][tileId];
              return partialDirectionalProbability + prob;
            },
            0
          )
        );
      }, 1);

    if (nextTileProbability === 0) tileEliminated = true;
    return nextTileProbability;
  });

  const sum = preNormalizedDomain.reduce(
    (runningSum, tileProb) => runningSum + tileProb,
    0
  );

  let nextDomain: Domain;
  if (sum === 0) {
    nextDomain = preNormalizedDomain;
  } else {
    nextDomain = preNormalizedDomain.map(
      (combinedProbability) => combinedProbability / sum
    );
  }

  const nextEntropy = getEntropy(nextDomain, tileset);

  world.tileProbSums = tileProbSums.map((currSum, tileId) => {
    const probChange = nextDomain[tileId] - domain[tileId];
    return currSum + probChange;
  });

  setCell(x, y, domains, world, nextDomain);
  setCell(x, y, entropies, world, nextEntropy);

  return tileEliminated;
};

export const updatePendingCells = (
  world: World,
  pending: [x: number, y: number][]
) => {
  while (pending.length > 0) {
    const [x, y] = pending.splice(
      Math.floor(Math.random() * pending.length),
      1
    )[0];
    const isChanged = updateCell(x, y, world);

    if (isChanged) {
      DIRS.forEach((offset) => {
        const [rawAdjX, rawAdjY] = [x + offset[0], y + offset[1]];
        const [adjX, adjY] = wrapBounds(rawAdjX, rawAdjY, world);
        pending.push([adjX, adjY]);
      });
    }
  }
};

export const collapseCell = (x: number, y: number, world: World) => {
  const { tileset, domains, entropies, tileProbSums } = world;

  const domain = getCell(x, y, domains, world);

  const collapsedId = weightedRandom(
    tileset.tiles.map((_, tileId) => tileId),
    domain
  ).item;

  const nextDomain = tileset.tiles.map((_, tileId) =>
    tileId === collapsedId ? 1 : 0
  );

  world.tileProbSums = tileProbSums.map(
    (tileProbSum, tileId) => tileProbSum + nextDomain[tileId] - domain[tileId]
  );

  setCell(x, y, domains, world, nextDomain);
  setCell(x, y, entropies, world, 0);

  const pending: [x: number, y: number][] = [];
  DIRS.forEach((offset) => {
    const [rawAdjX, rawAdjY] = [x + offset[0], y + offset[1]];
    const [adjX, adjY] = wrapBounds(rawAdjX, rawAdjY, world);
    pending.push([adjX, adjY]);
  });
  updatePendingCells(world, pending);
};

export const collapseLowestEntropyCell = (world: World) => {
  const { minEntropyRange, entropies } = world;

  let minIndices: number[] = [];
  let minEntropy = Number.MAX_VALUE;

  for (let i = 0; i < entropies.length; i++) {
    if (entropies[i] === 0) continue;
    if (entropies[i] < minEntropy - minEntropyRange) {
      minEntropy = entropies[i];
      minIndices = [i];
    } else if (entropies[i] <= minEntropy + minEntropyRange) {
      minIndices.push(i);
    }
  }

  if (minIndices.length === 0) return;

  const randomMinIndex =
    minIndices[Math.floor(Math.random() * minIndices.length)];

  const [x, y] = getPos(randomMinIndex, world);

  collapseCell(x, y, world);
};

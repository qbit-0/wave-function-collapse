import { Rules, Tileset } from "./WaveFunctionCollapse";

export const MIN_WIDTH = 1;
export const MAX_WIDTH = 500;
export const DEFAULT_WIDTH = 200;

export const MIN_HEIGHT = 1;
export const MAX_HEIGHT = 500;
export const DEFAULT_HEIGHT = 100;

export const DEFAULT_TILESET: Tileset = {
  tiles: [
    { name: "mountains", value: "#f0f4f5", ratio: 0.1 },
    { name: "hills", value: "#694e1a", ratio: 0.125 },
    { name: "forest", value: "#007d23", ratio: 0.1 },
    { name: "grass", value: "#3cff00", ratio: 0.35 },
    { name: "sand", value: "#c8ff00", ratio: 0.025 },
    { name: "coast", value: "#00decf", ratio: 0.1 },
    { name: "ocean", value: "#001975", ratio: 0.2 },
  ],
};
export const DEFAULT_RULES: Rules = [
  [
    [0.7, 0.3, 0, 0, 0, 0, 0],
    [0.7, 0.3, 0, 0, 0, 0, 0],
    [0.7, 0.3, 0, 0, 0, 0, 0],
    [0.7, 0.3, 0, 0, 0, 0, 0],
  ],
  [
    [0.2, 0.6, 0.2, 0.2, 0, 0, 0],
    [0.2, 0.6, 0.2, 0.2, 0, 0, 0],
    [0.2, 0.6, 0.2, 0.2, 0, 0, 0],
    [0.2, 0.6, 0.2, 0.2, 0, 0, 0],
  ],
  [
    [0, 0.25, 0.6, 0.3, 0, 0, 0],
    [0, 0.25, 0.6, 0.3, 0, 0, 0],
    [0, 0.25, 0.6, 0.3, 0, 0, 0],
    [0, 0.25, 0.6, 0.3, 0, 0, 0],
  ],
  [
    [0, 0.2, 0.2, 0.4, 0.2, 0, 0],
    [0, 0.2, 0.2, 0.4, 0.2, 0, 0],
    [0, 0.2, 0.2, 0.4, 0.2, 0, 0],
    [0, 0.2, 0.2, 0.4, 0.2, 0, 0],
  ],
  [
    [0, 0, 0, 0.2, 0.6, 0.2, 0],
    [0, 0, 0, 0.2, 0.6, 0.2, 0],
    [0, 0, 0, 0.2, 0.6, 0.2, 0],
    [0, 0, 0, 0.2, 0.6, 0.2, 0],
    [0, 0, 0, 0.2, 0.6, 0.2, 0],
  ],
  [
    [0, 0, 0, 0, 0.2, 0.6, 0.2],
    [0, 0, 0, 0, 0.2, 0.6, 0.2],
    [0, 0, 0, 0, 0.2, 0.6, 0.2],
    [0, 0, 0, 0, 0.2, 0.6, 0.2],
  ],
  [
    [0, 0, 0, 0, 0, 0.05, 0.95],
    [0, 0, 0, 0, 0, 0.05, 0.95],
    [0, 0, 0, 0, 0, 0.05, 0.95],
    [0, 0, 0, 0, 0, 0.05, 0.95],
  ],
];

export const MIN_RATIO_ADHERENCE = 1;
export const MAX_RATIO_ADHERENCE = 100;
export const DEFAULT_RATIO_ADHERENCE = 75;

export const MIN_MIN_ENTROPY_RANGE = 0;
export const MAX_MIN_ENTROPY_RANGE = 1;
export const DEFAULT_MIN_ENTROPY_RANGE = 0.5;

export const MIN_COLLAPSE_INTERVAL = 0.1;
export const MAX_COLLAPSE_INTERVAL = 500;
export const DEFAULT_COLLAPSE_INTERVAL = 1;

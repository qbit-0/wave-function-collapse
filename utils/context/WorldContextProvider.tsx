import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { resetWorld, Rules, Tileset, World } from "../WaveFunctionCollapse";

type DisplayMode = "biome" | "entropy";

type WorldContextType = {
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
  height: number;
  setHeight: Dispatch<SetStateAction<number>>;
  tileset: Tileset;
  setTileset: Dispatch<SetStateAction<Tileset>>;
  rules: Rules;
  setRules: Dispatch<SetStateAction<Rules>>;
  ratioAdherence: number;
  setRatioAdherence: Dispatch<SetStateAction<number>>;
  minEntropyRange: number;
  setMinEntropyRange: Dispatch<SetStateAction<number>>;
  pauseCollapse: boolean;
  setPauseCollapse: Dispatch<SetStateAction<boolean>>;
  collapseInterval: number;
  setCollapseInterval: Dispatch<SetStateAction<number>>;
  displayMode: DisplayMode;
  setDisplayMode: Dispatch<SetStateAction<DisplayMode>>;
  world: World;
  resetWorld: () => void;
};

export const WorldContext = createContext<WorldContextType>({} as any);

type Props = {
  children: React.ReactNode;
  initialWidth: number;
  initialHeight: number;
  initialTileset: Tileset;
  initialRules: Rules;
  initialRatioAdherence: number;
  initialMinEntropyRange: number;
  initialPauseCollapse: boolean;
  initialCollapseInteval: number;
  initialDisplayMode: DisplayMode;
};

const WorldContextProvider: FC<Props> = ({
  children,
  initialWidth,
  initialHeight,
  initialTileset,
  initialRules,
  initialRatioAdherence,
  initialMinEntropyRange,
  initialPauseCollapse,
  initialCollapseInteval,
  initialDisplayMode,
}) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [tileset, setTileset] = useState(initialTileset);
  const [rules, setRules] = useState(initialRules);
  const [ratioAdherence, setRatioAdherence] = useState(initialRatioAdherence);
  const [minEntropyRange, setMinEntropyRange] = useState(
    initialMinEntropyRange
  );

  const [pauseCollapse, setPauseCollapse] = useState(initialPauseCollapse);
  const [collapseInterval, setCollapseInterval] = useState(
    initialCollapseInteval
  );
  const [displayMode, setDisplayMode] = useState(initialDisplayMode);

  const world = useMemo(() => {
    const world: World = {
      width,
      height,
      tileset,
      rules,
      ratioAdherence,
      minEntropyRange,
      domains: [],
      entropies: [],
      tileProbSums: [],
    };
    resetWorld(world);
    return world;
  }, [width, height, tileset, rules, ratioAdherence, minEntropyRange]);

  const resetContextWorld = () => {
    resetWorld(world);
  };

  return (
    <WorldContext.Provider
      value={{
        world,
        width,
        setWidth,
        height,
        setHeight,
        tileset,
        setTileset,
        rules,
        setRules,
        ratioAdherence,
        setRatioAdherence,
        minEntropyRange,
        setMinEntropyRange,
        pauseCollapse,
        setPauseCollapse,
        collapseInterval,
        setCollapseInterval,
        displayMode,
        setDisplayMode,
        resetWorld: resetContextWorld,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
};

export default WorldContextProvider;
